/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArithmeticInstruction } from "../domain/instruction.ts";
import Opcode from "../domain/opcode.ts";

const add: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 + <number> arg1;
const subtract: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 - <number> arg1;
const multiply: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 * <number> arg1;
const divide: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 / <number> arg1;
const mod: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 % <number> arg1;

export default {
  [Opcode.ADD]: add,
  [Opcode.SUBTRACT]: subtract,
  [Opcode.MULTIPLY]: multiply,
  [Opcode.DIVIDE]: divide,
  [Opcode.MOD]: mod,
}
