import { handlerCaptureExceptionRule } from "./handler-capture-exception";
const plugin = {
  rules: { "handler-capture-exception": handlerCaptureExceptionRule },
};
module.exports = plugin;
