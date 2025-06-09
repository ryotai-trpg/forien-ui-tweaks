import {registerConfig}   from "config";
import {registerSettings} from "settings";

export default function init() {
  Hooks.once("init", () => {
    registerSettings();
    registerConfig();
  });
}
