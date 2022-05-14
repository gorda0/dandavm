import { parse } from "./src/parse";
import { VM } from "./src/vm";
import { Suite } from "benchmark";

const SIMPLE_LINE = "context Sum in end context Sub in end ";

const benchSuite = new Suite();

const preprocessed = {
  simple: {
    tokens: parse(SIMPLE_LINE),
  },
};

const vm = new VM();

setTimeout( () => {
  benchSuite
    //simple line
    .add("Parse a simple line", () => parse(SIMPLE_LINE + SIMPLE_LINE + SIMPLE_LINE))
    .add("Process a simple list of tokens", () =>
      vm.process(preprocessed.simple.tokens)
    )
    .add("Parse and process a simple line", () => vm.process(parse(SIMPLE_LINE + SIMPLE_LINE + SIMPLE_LINE)))

    .on("cycle", (event: any) => console.log(String(event.target)))
    .on("complete", function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log("Fastest is " + this.filter("fastest").map("name"));
    })
    .run();
}, 0);
