import { GenericToken } from "../src/native/instructions.ts";
import { parse, printFile } from "../src/parser.ts";
import { VM } from "../src/vm/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { defer } from "../src/utils/fn.ts";
import { unspace } from "../src/utils/string.ts";

const BENCHMARK_TEMP_DIR = "./bench_tmp";
const SIMPLE_LINE = "context Sum in end context Sub in end";

const { bench, remove, mkdir } = Deno;

const vm = new VM();

const preprocessed = {
  simple: {
    tokens: parse(SIMPLE_LINE),
  },
};

if (existsSync(BENCHMARK_TEMP_DIR)) {
  remove(BENCHMARK_TEMP_DIR, { recursive: true });
} else {
  mkdir(BENCHMARK_TEMP_DIR);
}

bench("parse a simple line", { group: "benching" }, () => {
  parse(SIMPLE_LINE);
});

bench("parse and compile a simple line", { group: "benching" }, () => {
  printFile(
    `${BENCHMARK_TEMP_DIR}/${unspace("parse and compile a simple line")}`,
    parse(SIMPLE_LINE),
  );
});

bench("compile a preprocessed list of tokens", { group: "benching" }, () => {
  printFile(
    `${BENCHMARK_TEMP_DIR}/${unspace("compile a preprocessed list of tokens")}`,
    preprocessed.simple.tokens,
  );
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
  { group: "benching" },
  () => {
    vm.process(parse(SIMPLE_LINE) as Array<GenericToken>);
  },
);

defer(() => {
  remove(BENCHMARK_TEMP_DIR, { recursive: true });
});
