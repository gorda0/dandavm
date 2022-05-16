import { ContextInstruction } from "./native/instructions.ts";

// TODO: create types.....................
export class Context {
  name: string;
  variables = {};
  methods = {};
  watchers = {};
  registers = {};
  clock = 0;

  constructor(name: string) {
    this.name = name;
  }
}

export const createContext: ContextInstruction = ({
  instructionCallback,
  args,
}) => {
  try {
    const [name] = args;

    //console.log("creating context:", name);
    const context = new Context(name);
    instructionCallback?.(context);
  } catch (err) {
    console.error(err);
  }
};