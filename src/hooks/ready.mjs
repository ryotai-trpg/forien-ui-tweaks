import changeSidebarTab from "hooks/changeSidebarTab";

export default function ready() {
  Hooks.once("ready", () => {
    changeSidebarTab();
  });
}
