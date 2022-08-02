import { InstructionToken } from "../src/lang/instructions.ts";
import { parse } from "../src/machine/parser.ts";
import { Machine } from "../src/machine/mod.ts";
import { existsSync } from "https://deno.land/std/fs/mod.ts";
import { defer } from "../src/utils/fn.ts";
import { unspace } from "../src/utils/string.ts";
import { writeFile } from "../src/utils/file.ts";

const BENCHMARK_TEMP_DIR = "./bench_tmp";
const SIMPLE_LINE = "context Sum in end context Sub in end";

const { bench, remove, mkdir } = Deno;

const vm = new Machine();

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

bench("tokenize a simple line", { group: "benching" }, () => {
  parse(SIMPLE_LINE);
});

bench("write a simple list of tokens to a temp file", { group: "benching" }, () => {
  writeFile(
    `${BENCHMARK_TEMP_DIR}/${unspace("print a list of tokens")}`,
    parse(SIMPLE_LINE),
  );
});

bench("write a simple preprocessed list of tokens to a temp file", { group: "benching" }, () => {
  writeFile(
    `${BENCHMARK_TEMP_DIR}/${unspace("print a preprocessed list of tokens")}`,
    preprocessed.simple.tokens,
  );
});

bench(
  "process a simple preprocessed list of tokens",
  { group: "benching", baseline: true },
  () => {
    vm.process(preprocessed.simple.tokens as Array<InstructionToken>);
  },
);

bench(
  "parse and process a simple list of tokens",
  { group: "benching" },
  () => {
    vm.process(parse(SIMPLE_LINE) as Array<InstructionToken>);
  },
);

defer(() => {
  remove(BENCHMARK_TEMP_DIR, { recursive: true });
});
