import {registerConfig}   from "../config.mjs";
import {registerSettings} from "../settings.mjs";

export default function init() {
  Hooks.once("init", () => {
    registerSettings();
    registerConfig();
  });
}
