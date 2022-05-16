// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  package: {
    name: "@dandavm/core",
    version: Deno.args[0],
    description: "dandavm core modules",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/gorda0/dandavm.git",
    },
    bugs: {
      url: "https://github.com/gorda0/dandavm/issues",
    },
  },
});
