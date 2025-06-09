import {setSetting} from "settings";

export default function changeSidebarTab() {
  Hooks.on("changeSidebarTab", (tab) => {
    setSetting("lastOpened", tab.id);
  });
}
