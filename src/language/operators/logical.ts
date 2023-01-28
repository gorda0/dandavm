/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogicalInstruction } from "../domain/instruction.ts";
import Opcode from "../domain/opcode.ts";

export const and: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 && arg1;
export const or: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 || arg1;
export const not: LogicalInstruction = ({ args: [arg0] }) => !arg0;
export const lsst: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 < arg1;
export const grtr: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 > arg1;
export const equal: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 === arg1;
export const not_equal: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 !== arg1;
export const greq: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) =>  arg0 >= arg1;
export const lseq: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => arg0 <= arg1;


export default {
  [Opcode.AND]: and,
  [Opcode.OR]: or,
  [Opcode.NOT]: not,
  [Opcode.LESS_THAN]: lsst,
  [Opcode.GREATER_THAN]: grtr,
  [Opcode.EQUAL]: equal,
  [Opcode.LESS_THAN_OR_EQUAL]: lseq,
  [Opcode.GREATER_THAN_OR_EQUAL]: greq,
  [Opcode.NOT_EQUAL]: not_equal,
}
