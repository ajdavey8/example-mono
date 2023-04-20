import { StackContext, use, ApiGatewayV1Api } from "sst/constructs";
import { resourceNameGenerator } from "@shieldpay/common";

export function ApiStack({ stack }: StackContext) {
    // TODO: remove this comment after test completed
    const resourceName = resourceNameGenerator(stack.stage, "");
  
    new ApiGatewayV1Api(stack, "partyApi", {
      cors: true,
      cdk: {
        restApi: {
          restApiName: resourceName("api"),
        },
      },
      routes: {
        
      },
    });
  }
  