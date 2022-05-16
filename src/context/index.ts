import { mountScopeName } from "../utils/scope";
import { CallbackInstruction } from "../native/instructions";
// TODO: create types.....................
export class Context {
  name: string;
  variables = {};
  methods = {};
  watchers = {};
  registers = {};
  clock = 0;

  constructor(name: string) {
    this.name = mountScopeName(name);
  }
}

export const createContext = ({
  instructionCallback,
  args,
}: CallbackInstruction<Context, Array<string>>): void => {
  try {
    const [name] = args;

    console.log("creating context:", name);
    const context = new Context(name);
    instructionCallback?.(context);
  } catch (err) {
    console.error(err);
  }
};
