import { CorsOptions } from "aws-cdk-lib/aws-apigateway";

export const defaultCors = (methods: string[]): CorsOptions => ({
  allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key"],
  allowCredentials: true,
  allowOrigins: ["*"],
  allowMethods: methods,
});
