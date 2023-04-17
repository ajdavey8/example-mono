import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

interface Props extends cdk.StackProps {
  stage: string;
  env: cdk.Environment & {
    region: string;
    publishEvent: boolean;
  };
}

export class GoldenStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: Props) {
    super(scope, id, props);

    const {
      stage,
      env: { publishEvent },
    } = props;

    const securityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      "AuroraSecGroup",
      `auroraVPCSecurityGroup-${stage}`
    );
    const vpc = new ec2.Vpc(this, "AuroraVpc", {
      subnetConfiguration: [
        {
          name: `auroraSubnetA-${stage}`,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        {
          name: `auroraSubnetB-${stage}`,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        {
          name: `auroraSubnetC-${stage}`,
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });

    // Create knex migration and rollback Lambdas, will be invoked from ci
    new NodejsFunction(this, "KnexMigration", {
      functionName: `golden-knex-migration-${stage}`,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      environment: {
        NODE_OPTIONS: "–-enable-source-maps",
      },
      entry: path.join(__dirname, "../src/knex/handler/run-migrations.ts"),
      vpc: vpc,
      securityGroups: [securityGroup],
    });
    // Create external-payment-failed Lambda
    const externalPaymentFailedLambda = new NodejsFunction(
      this,
      "ExternalPaymentFailed",
      {
        functionName: `golden-external-payment-failed-${stage}`,
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: "handler",
        environment: {
          NODE_OPTIONS: "–-enable-source-maps",
          PUBLISH_EVENT: String(publishEvent),
        },
        timeout: cdk.Duration.seconds(30),
        entry: path.join(
          __dirname,
          "../src/handler/event/external-payment-failed.ts"
        ),
      }
    );
    const queue = new sqs.Queue(this, "GoldenQueue", {
      queueName: "GoldenService-ExternalPaymentFailed",
    });
    const eventSource = new lambdaEventSources.SqsEventSource(queue);
    externalPaymentFailedLambda.addEventSource(eventSource);

    // Create create-partner Lambda
    const createPartnerLambda = new NodejsFunction(this, "CreatePartner", {
      functionName: `golden-create-partner-${stage}`,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "handler",
      environment: {
        NODE_OPTIONS: "–-enable-source-maps",
        PARTNERS_TABLE: "partners",
      },
      timeout: cdk.Duration.seconds(30),
      entry: path.join(__dirname, "../src/handler/api/create-partner.ts"),
      vpc: vpc,
      securityGroups: [securityGroup],
    });

    const api = new apigateway.RestApi(this, "GoldenServiceApi", {
      description: "Example of api gateway",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowCredentials: true,
        allowOrigins: ["*"],
      },
    });
    const partnersResource = api.root.addResource("partners");
    partnersResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(createPartnerLambda)
    );
  }
}
