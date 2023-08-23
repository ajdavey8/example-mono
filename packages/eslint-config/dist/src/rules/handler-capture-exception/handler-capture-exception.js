"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerCaptureExceptionRule = void 0;
/**
 * Check if the file being tested is a lambda handler file. We'll do this by
 * checking if the file is located in a directory with `/src/handlers/` or
 * `/src/handler/` in the path.
 */
const isHandlerFile = (fileName) => new RegExp("/src/handlers?/").test(fileName);
exports.handlerCaptureExceptionRule = {
    "handler-capture-exception": {
        name: "Handler Capture Exception",
        meta: {
            type: "problem",
            messages: {
                wrapFunctionWithCaptureException: "Handlers must be wrapped by the captureException() function",
            },
            schema: [],
            docs: {
                description: "Handlers must be wrapped by the captureException() function",
            },
        },
        defaultOptions: [],
        create: function (context) {
            return {
                // 🎯 TODO: This could be improved upon as it only checks the `captureException`
                // function is imported and called in the scope of a handler file. It doesn't
                // actually check that the exported handler is composed using the function.
                "Program:exit"(node) {
                    const fileName = context.getPhysicalFilename
                        ? context.getPhysicalFilename()
                        : context.getFilename();
                    if (isHandlerFile(fileName) && node.tokens) {
                        const captureExceptionTokens = node.tokens
                            .filter((token) => token.type === "Identifier")
                            .filter((token) => token.value === "captureException");
                        // The capture exception token should be found in the file at least twice. Once
                        // for the import and then once when it is used to compose the handler.
                        if (captureExceptionTokens.length < 2) {
                            context.report({
                                node,
                                messageId: "wrapFunctionWithCaptureException",
                            });
                        }
                    }
                },
            };
        },
    },
};
//# sourceMappingURL=handler-capture-exception.js.map