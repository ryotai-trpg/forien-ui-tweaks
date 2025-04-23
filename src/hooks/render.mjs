import {setting} from "../settings.mjs";

export default function render() {
  Hooks.once("renderSidebar", (sidebar, _html, _context, _options) => {
    if (setting("autoExpandSidebar")) {
      const tab = setting("defaultTab");
      sidebar.expand();
      sidebar.changeTab(tab, "primary");
    }
  });

  Hooks.once("renderHotbar", (hotbar, html, _context, _options) => {
    if (!setting("collapsibleHotbar")) return;
    const expanded = !setting("hotbarDefaultCollapsed");

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
    toggleHotbar(html, button, expanded)

    button.addEventListener("click", event => {
      const expanded = button.classList.contains("fa-caret-left");
      toggleHotbar(html, button, !expanded)
    })
  });

  Hooks.once("renderPlayers", (players, html, _context, _options) => {
    if (!setting("hidePerformance")) return;

    const performanceStats = html.querySelector("#performance-stats");
    performanceStats.classList.add("hidden");
  })

  Hooks.once("renderGamePause", (pause, html, _context, _options) => {
    if (!setting("lowerPauseBanner")) return;

    html.style.top = "calc(72vh - 100px)";
  })
}
