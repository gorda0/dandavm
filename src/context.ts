import { ContextInstruction } from "./native/instructions.ts";
import { ScopeBody } from "./native/scope.ts";


// TODO: create types.....................
export class Context implements ScopeBody {
  name: string;
  registers = {};
  clock = 0;

  //scope
  variables = {};
  methods = {};
  watchers = {};

  constructor(name: string) {
    this.name = name;
  }
}
//TODO : pass all this shit to vm class1
export const createContext: ContextInstruction = ({
  instructionCallback,
  args: [name, scopeToken],
}) => {
  try {
    //console.log("creating context:", name);
    const context = new Context(name as string);
    //console.log("created a new context in memory: ", name)
    instructionCallback?.([context, scopeToken]);
  } catch (err) {
    console.error(err);
  }
};
