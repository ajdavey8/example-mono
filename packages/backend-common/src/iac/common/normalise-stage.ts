import { Stage } from "../../type/env";

export const normaliseStage = (stage: string): Stage => {
  // Stage names for dev environment vary and don't follow any consistent pattern.
  // If the stage is not one of the known stages, e.g., `prod`, we'll assume we're
  // deploying to a development environment.
  const stages: string[] = Object.values(Stage);
  return stages.includes(stage) ? (stage as Stage) : Stage.Development;
};
