import { Context } from "../domain/context.ts";
import { ContextInstruction } from "../domain/instruction.ts";
import Opcode from "../domain/opcode.ts";

export const createContext: ContextInstruction = ({
  args: [{data: name}],
  machineInstruction,
}) => {
  console.log("creating context:", name);
  console.log("created a new context in memory: ", name)
  console.log("new context: ", new Context(name as string));
  machineInstruction?.(new Context(name as string));
};

export default {
  [Opcode.CREATE_CONTEXT]: createContext,
}
