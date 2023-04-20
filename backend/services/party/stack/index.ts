import { App } from "sst/constructs";
import { ApiStack } from "./api";

export default function main(app: App) {
  // 👇 Set default Lambda props, regardless of stack.
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    architecture: "arm_64",
    environment: {
      STAGE: app.stage,
      REGION: app.region,
    },
  });

    // 👇 Define the shared stack tags.
    const stackTags = process.env.GITHUB_AUTHOR
    ? { GITHUB_AUTHOR: process.env.GITHUB_AUTHOR }
    : undefined;

  // 👇 Add stacks to the app.
  await app.stack(ApiStack, {
    stackName: `party--${app.stage}`,
    tags: stackTags,
  });

}
