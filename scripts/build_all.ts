const { args: [coreVersion, cliVersion], run } = Deno;

run({ cmd: ["deno", "run", "scripts/build_core.ts", coreVersion] });
run({ cmd: ["deno", "run", "scripts/build_cli.ts", cliVersion] });
