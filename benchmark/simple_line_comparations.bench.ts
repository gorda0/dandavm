import { GenericToken } from "../src/native/instructions.ts";
import { parse } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";
import {parse as cjsParse, VM as cjsVM} from "../npm_core/esm/mod.js"

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

bench("(Deno TS) Parse a simple line", { group: "parsing", baseline: true }, () => {
  parse(SIMPLE_LINE);
});

bench("(CJS) Parse a simple line", { group: "parsing" }, () => {
  cjsParse(SIMPLE_LINE);
});

bench(
  "(Deno Recursive) process a simple list of tokens",
  { group: "processing", baseline: true },
  () => {
    vm.process(preprocessed.simple.tokens as Array<GenericToken>);
  },
);

bench(
  "(Deno Recursive) parse and process a simple line",
  { group: "parseAndProcess", baseline: true },
  () => {
    vm.process(parse(SIMPLE_LINE) as Array<GenericToken>);
  },
);

bench(
  "(CJS Recursive) Process a simple list of tokens",
  { group: "processing" },
  () => {
    (cVM as any).process(cjsPreprocessed.simple.tokens as Array<GenericToken>);
  },
);

bench(
  "(CJS Recursive) Parse and process a simple line",
  { group: "parseAndProcess" },
  () => {
    (cVM as any).process(cjsParse(SIMPLE_LINE) as Array<GenericToken>);
  },
);

bench(
  "(Deno FOR LOOP) Process a simple list of tokens",
  { group: "processing" },
  () => {
    vm.bProcess(preprocessed.simple.tokens as Array<GenericToken>);
  },
);

bench(
  "(Deno FOR LOOP) Parse and process a simple line",
  { group: "parseAndProcess" },
  () => {
    vm.bProcess(parse(SIMPLE_LINE) as Array<GenericToken>);
  },
);

bench(
  "(CJS FOR LOOP) Process a simple list of tokens",
  { group: "processing" },
  () => {
    (cVM as any).bProcess(cjsPreprocessed.simple.tokens as Array<GenericToken>);
  },
);

bench(
  "(CJS FOR LOOP) Parse and process a simple line",
  { group: "parseAndProcess" },
  () => {
    (cVM as any).bProcess(cjsParse(SIMPLE_LINE) as Array<GenericToken>);
  },
);