import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";
import { packageDefaults } from "./helpers.ts"

const CORE_DIR = "./npm_core";

await emptyDir(CORE_DIR);

await build({
  entryPoints: ["./mod.ts"],
  outDir: CORE_DIR,
  shims: {
    deno: true,
  },
  package: {
    name: "@dandavm/core",
    description: "dandavm core modules",
    ...packageDefaults
  },
});
