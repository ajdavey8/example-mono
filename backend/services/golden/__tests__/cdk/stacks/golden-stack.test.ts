import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { GoldenStack } from "../../../stack/golden";
import { logicalIdFromResource } from "../../test-helpers";

describe("The Golden Stack", () => {
  const props = {
    stage: "test",
    env: {
      region: "eu-west-1",
      publishEvent: false,
    },
  };
  const app = new cdk.App();
  const stack = new GoldenStack(app, "GoldenStack", props);
  const template = Template.fromStack(stack);

  test("deploys the external payment failed lambda", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "golden-external-payment-failed-test",
    });

    template.hasResourceProperties("AWS::SQS::Queue", {
      QueueName: "GoldenService-ExternalPaymentFailed",
    });
    const queue = template.findResources("AWS::SQS::Queue", {
      Properties: {
        QueueName: "GoldenService-ExternalPaymentFailed",
      },
    });
    const queueLogicalId = logicalIdFromResource(queue);

    template.hasResourceProperties("AWS::Lambda::EventSourceMapping", {
      EventSourceArn: {
        "Fn::GetAtt": [queueLogicalId, "Arn"],
      },
    });
  });

  test("deploys the create partners lambda", () => {
    template.hasResourceProperties("AWS::Lambda::Function", {
      FunctionName: "golden-create-partner-test",
    });
    const lambda = template.findResources("AWS::Lambda::Function", {
      Properties: {
        FunctionName: "golden-create-partner-test",
      },
    });
    const lambdaLogicalId = logicalIdFromResource(lambda);

    template.hasResourceProperties("AWS::ApiGateway::Method", {
      HttpMethod: "GET",
      Integration: {
        Uri: {
          "Fn::Join": [
            "",
            [
              "arn:",
              { Ref: "AWS::Partition" },
              ":apigateway:eu-west-1:lambda:path/2015-03-31/functions/",
              {
                "Fn::GetAtt": [lambdaLogicalId, "Arn"],
              },
              "/invocations",
            ],
          ],
        },
      },
    });
  });
});
