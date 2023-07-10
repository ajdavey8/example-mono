/**
 * Check if the file being tested is a lambda handler file. We'll do this by
 * checking if the file is located in a directory with `/src/handlers/` or
 * `/src/handler/` in the path.
 */
const isHandlerFile = (fileName) =>
  new RegExp("/src/handlers?/").test(fileName);

module.exports = {
  rules: {
    "handler-capture-exception": {
      meta: {
        type: "problem",
      },
      create: function (context) {
        return {
          // 🎯 TODO: This could be improved upon as it only checks the `captureException`
          // function is imported and called in the scope of a handler file. It doesn't
          // actually check that the exported handler is composed using the function.
          "Program:exit"(node) {
            const fileName = context.getPhysicalFilename();

            if (isHandlerFile(fileName)) {
              const captureExceptionTokens = node.tokens
                .filter((token) => token.type === "Identifier")
                .filter((token) => token.value === "captureException");

              // The capture exception token should be found in the file at least twice. Once
              // for the import and then once when it is used to compose the handler.
              if (captureExceptionTokens.length < 2) {
                context.report({
                  node,
                  message:
                    "Handlers must be wrapped by the captureException() function",
                });
              }
            }
          },
        };
      },
    },
  },
};
