/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArithmeticInstruction } from "../instructions.ts";

export const add: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 + <number> arg1;
export const subtract: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 - <number> arg1;
export const multiply: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 * <number> arg1;
export const divide: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 / <number> arg1;
export const mod: ArithmeticInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 % <number> arg1;
