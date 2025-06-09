import init   from "hooks/init.mjs";
import ready  from "hooks/ready";
import render from "hooks/render.mjs";


export function hooks() {
  init();
  render();
  ready();
}
