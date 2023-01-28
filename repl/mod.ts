import { InstructionToken } from "../src/language/domain/token.ts";
import { scan, emit } from "../src/machine/scanner.ts";
import { Machine } from "../src/machine/mod.ts";

const vm = new Machine();

export async function interactionLoop(shouldAsk: boolean) {
  if (shouldAsk) {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode("INSTRUCTION> "));
    const n = <number> await Deno.stdin.read(buf);
    const line = new TextDecoder().decode(buf.subarray(0, n)).trim();
    if (line === "EXIT") interactionLoop(false);
    else {
      console.log(emit(scan(line) as Array<InstructionToken>))
      vm.process(emit(scan(line) as Array<InstructionToken>));
      interactionLoop(true);
    }
  } else Deno.exit();
}
