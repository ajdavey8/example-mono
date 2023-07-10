const handlerCaptureExceptionRule = require("./handler-capture-exception");
const plugin = { rules: { "handler-capture-exception": handlerCaptureExceptionRule } };
module.exports = plugin;