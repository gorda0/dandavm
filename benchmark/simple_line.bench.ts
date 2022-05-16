import { parse } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";

const { bench } = Deno;
const SIMPLE_LINE = "context Sum in end context Sub in end";

const preprocessed = {
  simple: {
    tokens: parse(SIMPLE_LINE),
  },
};

const vm = new VM();

//simple linez
bench("Parse a simple line", { group: "timing" }, () => {
  parse(SIMPLE_LINE);
});

bench(
  "Process a simple list of tokens",
  { group: "timing", baseline: true },
  () => vm.process(preprocessed.simple.tokens),
);

bench(
  "Parse and process a simple line",
  { group: "timing" },
  () => vm.process(parse(SIMPLE_LINE)),
);
