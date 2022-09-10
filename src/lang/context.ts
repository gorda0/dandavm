import { ContextInstruction } from "./instructions.ts";
import { ScopeBody } from "./scope.ts";

// TODO: create types.....................
export class Context implements ScopeBody {
  name: string;
  clock = 0;

  //scope
  variables = {};
  methods = {};
  watchers = {};

  constructor(name: string) {
    this.name = name;
  }
}

export const createContext: ContextInstruction = ({
  args: [name],
  machineInstruction,
}) => {
  //console.log("creating context:", name);
  //console.log("created a new context in memory: ", name)
  machineInstruction?.(new Context(name.data as string));
};
