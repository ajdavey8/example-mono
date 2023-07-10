module.exports = {
  rules: {
    "use-optimus-events": {
      create: function (context) {
        return {
          CallExpression(node) {
            if (node.callee.name === "publishEvent") {
              context.report(
                node,
                "publishEvent() has been deprecated, please use publishOptimusEvent() instead."
              );
            }
          },
          MemberExpression(node) {
            if (node.object.name === "BusEvent") {
              context.report(
                node,
                "BusEvent has been deprecated, please use EventName instead."
              );
            }
          },
        };
      },
    },
  },
};
