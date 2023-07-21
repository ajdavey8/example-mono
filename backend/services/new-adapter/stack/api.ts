import { StackContext, ApiGatewayV1Api } from "sst/constructs";
import { resourceNameGenerator } from "@shieldpay/common";

export function ApiStack({ stack }: StackContext) {
    const resourceName = resourceNameGenerator(stack.stage, "");
  
    new ApiGatewayV1Api(stack, "new-adapterApi", {
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
  