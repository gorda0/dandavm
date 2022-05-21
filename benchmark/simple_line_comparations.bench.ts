// deno-lint-ignore-file no-explicit-any
import { GenericToken } from "../src/native/instructions.ts";
import { parse } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";
import { parse as cjsParse, VM as cjsVM } from "../npm_core/esm/mod.js";

const { bench } = Deno;
const SIMPLE_LINE = "context Sum in end context Sub in end";

const preprocessed = {
  simple: {
    tokens: parse(SIMPLE_LINE),
  },
};

const cjsPreprocessed = {
  simple: {
    tokens: cjsParse(SIMPLE_LINE),
  },
};

const vm = new VM();
const cVM = new cjsVM();

bench(
  "(Deno) parse a simple line",
  { group: "parsing", baseline: true },
  () => {
    parse(SIMPLE_LINE);
  },
);

bench("(CJS) parse a simple line", { group: "parsing" }, () => {
  cjsParse(SIMPLE_LINE);
});

bench(
  "(Deno) process a simple list of tokens",
  { group: "processing", baseline: true },
  () => {
    vm.process(<Array<GenericToken>>preprocessed.simple.tokens);
  },
);

bench(
  "(Deno) parse and process a simple line",
  { group: "parseAndProcess", baseline: true },
  () => {
    vm.process(<Array<GenericToken>>parse(SIMPLE_LINE));
  },
);

bench(
  "(CJS) process a simple list of tokens",
  { group: "processing" },
  () => {
    (<any> cVM).process(<Array<GenericToken>>cjsPreprocessed.simple.tokens);
  },
);

bench(
  "(CJS) parse and process a simple line",
  { group: "parseAndProcess" },
  () => {
    (<any> cVM).process(<Array<GenericToken>>cjsParse(SIMPLE_LINE));
  },
);
