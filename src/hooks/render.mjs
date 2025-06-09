import {setting} from "../settings.mjs";

export default function render() {
  Hooks.on("renderSidebar", (sidebar, _html, _context, _options) => {
    if (setting("autoExpandSidebar")) {
      let tab = setting("defaultTab");
      if (tab === "last")
        tab = setting("lastOpened");

      if (tab) sidebar.changeTab(tab, "primary");

      sidebar.expand();
    }
  });

  Hooks.on("renderHotbar", (hotbar, html, context, options) => {
    if (!setting("collapsibleHotbar")) return;
    let expanded;

    if (options.isFirstRender) expanded = !setting("hotbarDefaultCollapsed");
    else expanded = !html.querySelector("#action-bar").classList.contains("collapsed");

    function toggleHotbar(html, button, expanded) {
      button.classList.remove("fa-bars", "fa-caret-left", "fa-caret-right");
      button.classList.add(`fa-caret-${expanded ? "left" : "right"}`);
      button.dataset.tooltip = expanded ? "Collapse" : "Expand";

      const bar = html.querySelector("#action-bar");
      const controls = html.querySelector("#hotbar-controls-right");

      if (expanded) {
        bar.classList.remove("collapsed");
        controls.classList.remove("collapsed");
      } else {
        bar.classList.add("collapsed");
        controls.classList.add("collapsed");
      }
    }

    const button = html.querySelector("[data-action='menu']");
    button.dataset.action = "toggleHotbar";
    toggleHotbar(html, button, expanded);

    button.addEventListener("click", event => {
      const expanded = button.classList.contains("fa-caret-left");
      toggleHotbar(html, button, !expanded);
    });
  });

  Hooks.on("renderPlayers", (players, html, _context, _options) => {
    if (!setting("hidePerformance")) return;

    const performanceStats = html.querySelector("#performance-stats");
    performanceStats.classList.add("hidden");
  });

  Hooks.on("renderGamePause", (pause, html, _context, _options) => {
    if (!setting("lowerPauseBanner")) return;

    html.style.top = "calc(72vh - 100px)";
  });
}
