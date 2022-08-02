/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArithmeticInstruction } from "../instructions.ts";

export const add: ArithmeticInstruction = ({ args: [arg0, arg1] }) => arg0 + arg1;
export const subtract: ArithmeticInstruction = ({ args: [arg0, arg1] }) =>
  arg0 - arg1;
export const multiply: ArithmeticInstruction = ({ args: [arg0, arg1] }) =>
  arg0 * arg1;
export const divide: ArithmeticInstruction = ({ args: [arg0, arg1] }) =>
  arg0 / arg1;
export const mod: ArithmeticInstruction = ({ args: [arg0, arg1] }) => arg0 % arg1;
