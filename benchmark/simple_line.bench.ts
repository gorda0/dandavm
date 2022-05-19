import { GenericToken } from "../src/native/instructions.ts";
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

bench("parse a simple line", { group: "benching" }, () => {
  parse(SIMPLE_LINE);
});

bench(
  "process a simple list of tokens",
  { group: "benching", baseline: true },
  () => {
    vm.process(preprocessed.simple.tokens as Array<GenericToken>);
  },
);

bench(
  "parse and process a simple line",
  { group: "benching"},
  () => {
    vm.process(parse(SIMPLE_LINE) as Array<GenericToken>);
  },
);