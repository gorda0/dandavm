import { parse } from "../src/parse";
import { VM } from "../src/vm";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const vm: VM = new VM();

const interactionLoop = (shouldAsk: boolean): void => {
  if (shouldAsk)
    rl.question("COMMAND> ", (line: string): void => {
      if (line === "EXIT") interactionLoop(false);
      else {
        vm.process(parse(line));
        interactionLoop(true);
      }
    });
  else process.exit();
};

interactionLoop(true);
