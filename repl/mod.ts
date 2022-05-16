import { parse } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";

const vm: VM = new VM();

function interactionLoop(shouldAsk: boolean): void {
  if (shouldAsk) {
    const line = prompt("INSTRUCTION> ");
    if (line === "EXIT") interactionLoop(false);
    else {
      vm.process(parse(line as string));
      interactionLoop(true);
    }
  } else Deno.exit();
}

interactionLoop(true);
