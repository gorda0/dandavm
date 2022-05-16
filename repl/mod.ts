import { parse } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";

const vm: VM = new VM();

export async function interactionLoop(shouldAsk: boolean): Promise<void> {
  if (shouldAsk) {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode("INSTRUCTION> "));
    const n = <number> await Deno.stdin.read(buf);
    const line = new TextDecoder().decode(buf.subarray(0, n)).trim();
    if (line === "EXIT") interactionLoop(false);
    else {
      vm.process(parse(line));
      interactionLoop(true);
    }
  } else Deno.exit();
}
