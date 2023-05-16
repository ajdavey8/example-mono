"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normaliseStage = void 0;
const env_1 = require("../../type/env");
const normaliseStage = (stage) => {
    // Stage names for dev environment vary and don't follow any consistent pattern.
    // If the stage is not one of the known stages, e.g., `prod`, we'll assume we're
    // deploying to a development environment.
    const stages = Object.values(env_1.Stage);
    return stages.includes(stage) ? stage : env_1.Stage.Development;
};
exports.normaliseStage = normaliseStage;
//# sourceMappingURL=normalise-stage.js.map