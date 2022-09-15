import { scan } from "../src/machine/scanner.ts";
import { Machine } from "../src/machine/mod.ts";
import { defer } from "../src/utils/fn.ts";

const BENCHMARK_TEMP_DIR = "./bench_tmp";
const SIMPLE_LINE = "context Sum in end context Sub in end";

const { bench, remove } = Deno;

const vm = new Machine();

const preprocessed = {
  simple: {
    tokens: scan(SIMPLE_LINE),
  },
};

bench("tokenize a simple line", { group: "benching" }, () => {
  scan(SIMPLE_LINE);
});

bench(
  "process a simple preprocessed list of tokens",
  { group: "benching", baseline: true },
  () => {
    vm.process(preprocessed.simple.tokens);
  },
);

bench(
  "parse and process a simple list of tokens",
  { group: "benching" },
  () => {
    vm.process(scan(SIMPLE_LINE));
  },
);

defer(() => {
  remove(BENCHMARK_TEMP_DIR, { recursive: true });
});
