import {CON} from "./const.mjs";

function tabChoices() {
  const tabs = {
    chat: foundry.documents.ChatMessage.metadata.labelPlural,
    combat: foundry.documents.Combat.metadata.labelPlural,
    scenes: foundry.documents.Scene.metadata.labelPlural,
    actors: foundry.documents.Actor.metadata.labelPlural,
    items: foundry.documents.Item.metadata.labelPlural,
    journal: "SIDEBAR.TabJournal",
    tables: foundry.documents.RollTable.metadata.labelPlural,
    cards: foundry.documents.Cards.metadata.labelPlural,
    macros: foundry.documents.Macro.metadata.labelPlural,
    playlists: foundry.documents.Playlist.metadata.labelPlural,
    compendium: "SIDEBAR.TabCompendium",
    settings: "SIDEBAR.TabSettings",
  }

  if (game.user.isGM) return tabs;

  delete tabs.scenes;
  return tabs;
}

const {SHIFT, CONTROL} = foundry.helpers.interaction.KeyboardManager.MODIFIER_KEYS;

const KEYBINDINGS = {
  hideUI: {
    key: "hideUI",
    label: "HideUI",
    editable: [
      {
        modifiers: [SHIFT, CONTROL],
        key: "KeyX",
      }
    ],
    onDown: () => {
      document.querySelector("#interface").classList.toggle("hidden");
    }
  }
}

const SETTINGS = {
  autoExpandSidebar: {
    key: "autoExpandSidebar",
    label: "AutoExpandSidebar",
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  },
  defaultTab: {
    key: "defaultTab",
    label: "DefaultTab",
    scope: "client",
    config: true,
    default: "chat",
    type: String,
    choices: tabChoices
  },
  collapsibleHotbar: {
    key: "collapsibleHotbar",
    label: "CollapsibleHotbar",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true,
  },
  hotbarDefaultCollapsed: {
    key: "hotbarDefaultCollapsed",
    label: "HotbarDefaultCollapsed",
    scope: "client",
    config: true,
    default: false,
    type: Boolean
  },
  hidePerformance: {
    key: "hidePerformance",
    label: "HidePerformance",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => {
      const performanceStats = document.querySelector("#performance-stats");
      if (value)
        performanceStats.classList.add("hidden");
      else
        performanceStats.classList.remove("hidden");
    }
  },
  lowerPauseBanner: {
    key: "lowerPauseBanner",
    label: "LowerPauseBanner",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => {
      const pauseBanner = document.querySelector("#pause");
      if (value)
        pauseBanner.style.top = "calc(72vh - 100px)";
      else
        delete pauseBanner.style.top;
    }
  },
};

export function registerSettings() {
  for (const [_key, setting] of Object.entries(SETTINGS)) {
    game.settings.register(setting.namespace ?? CON.ID, setting.key, foundry.utils.mergeObject(setting, {
      name: `${CON.I18N_PREFIX}.SETTINGS.${setting.label}.Name`,
      hint: `${CON.I18N_PREFIX}.SETTINGS.${setting.label}.Hint`,
    }));
  }

  for (const [_key, keybind] of Object.entries(KEYBINDINGS)) {
    game.keybindings.register(setting.namespace ?? CON.ID, keybind.key, foundry.utils.mergeObject(keybind, {
      name: `${CON.I18N_PREFIX}.KEYBINDINGS.${keybind.label}.Name`,
      hint: `${CON.I18N_PREFIX}.KEYBINDINGS.${keybind.label}.Hint`,
    }));
  }
  game.keybindings.register(CON.ID, "test", {name: "hint will be duplicated", hint:"test"})
}

export function setting(setting) {
  if (!(setting in SETTINGS))
    throw new Error(`Setting ${setting} is not defined in ${CON.ID}.`);

  return game.settings.get(CON.ID, setting);
}