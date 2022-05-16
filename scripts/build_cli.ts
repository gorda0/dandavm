import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";
import { packageDefaults } from "./helpers.ts";

const CLI_DIR = "./npm_cli";
const ESM_PATH = "/esm/cli.js";
const FULL_PATH = CLI_DIR + ESM_PATH;
const shebang = "#!/usr/bin/env node \n";

await emptyDir(CLI_DIR);

await build({
  entryPoints: ["./cli.ts"],
  outDir: CLI_DIR,
  shims: {
    deno: true,
    prompts: true,
  },
  package: {
    name: "@dandavm/cli",
    description: "dandavm cli",
    ...packageDefaults,
    bin: {
      "danda": "." + ESM_PATH,
    },
  },
});

const cliContent = await Deno.readTextFile(FULL_PATH);

await Deno.writeTextFile(FULL_PATH, shebang + cliContent);

await Deno.chmod(FULL_PATH, 0o764);
