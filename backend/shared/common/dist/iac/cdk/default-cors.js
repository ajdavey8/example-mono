"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCors = void 0;
const defaultCors = (methods) => ({
    allowHeaders: ["Content-Type", "X-Amz-Date", "Authorization", "X-Api-Key"],
    allowCredentials: true,
    allowOrigins: ["*"],
    allowMethods: methods,
});
exports.defaultCors = defaultCors;
//# sourceMappingURL=default-cors.js.map