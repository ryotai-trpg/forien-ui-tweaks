import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import nodeResolve from "@rollup/plugin-node-resolve";
import {foundryPath, getManifest} from "./_common.mjs";

const manifest = getManifest();

export default {
  input: `./src/${manifest.id}.mjs`,
  output: {
    file: `${foundryPath(manifest.id)}/${manifest.id}.mjs`,
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    postcss({
      extract: `styles/${manifest.id}.css`,
      plugins: []
    }),
    copy({
      targets: [
        {src: `./static/*`, dest: `${foundryPath(manifest.id)}/`},
        {src: `./LICENSE`, dest: `${foundryPath(manifest.id)}/`},
        {src: `./CONTRIBUTORS`, dest: `${foundryPath(manifest.id)}/`},
        {src: `./CHANGELOG.md`, dest: `${foundryPath(manifest.id)}/`},
        {src: `./README.md`, dest: `${foundryPath(manifest.id)}/`},
      ]
    })
  ]
}