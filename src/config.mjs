import {setting} from "./settings.mjs";

export function registerConfig() {
  const maxZoom = setting("maxZoom");
  if (maxZoom && maxZoom > 0) CONFIG.Canvas.maxZoom = maxZoom;
  const minZoom = setting("minZoom");
  if (minZoom && minZoom > 0) CONFIG.Canvas.minZoom = minZoom;
}