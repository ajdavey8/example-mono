"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceNameGenerator = void 0;
const resourceNameGenerator = (stage, prefix) => {
    return (name) => `${prefix ? `${prefix}--` : ""}${name}--${stage}`;
};
exports.resourceNameGenerator = resourceNameGenerator;
//# sourceMappingURL=resource-name-generator.js.map