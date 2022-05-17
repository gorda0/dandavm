import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";
import { packageDefaults } from "./helpers.ts";

const CLI_DIR = "./npm_cli";

await emptyDir(CLI_DIR);

await build({
  entryPoints: [{
    kind: "bin",
    name: "danda",
    path: "./cli.ts",
  }],
  outDir: CLI_DIR,
  shims: {
    deno: true,
    prompts: true,
  },
  package: {
    name: "@dandavm/cli",
    description: "dandavm cli",
    ...packageDefaults,
  }
});
