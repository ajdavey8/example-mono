#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { GoldenStack } from "../stack/golden";

if (!process.env.STAGE) {
  throw new Error("Please pass STAGE env var in order to deploy");
}

const app = new cdk.App();

const STAGE = String(process.env.STAGE);
const region = "eu-west-1";

new GoldenStack(app, "GoldenStack", {
  stackName: `golden-${STAGE}`,
  stage: STAGE,
  env: {
    region,
    publishEvent: Boolean(process.env.PUBLISH_EVENT),
  },
});
