/* eslint-disable @typescript-eslint/no-unused-vars */
import { OperatorInstruction } from "./instructions.ts";

export const add: OperatorInstruction = ({ args: [arg0, arg1] }) => arg0 + arg1;
export const subtract: OperatorInstruction = ({ args: [arg0, arg1] }) =>
  arg0 - arg1;
export const multiply: OperatorInstruction = ({ args: [arg0, arg1] }) =>
  arg0 * arg1;
export const divide: OperatorInstruction = ({ args: [arg0, arg1] }) =>
  arg0 / arg1;
export const mod: OperatorInstruction = ({ args: [arg0, arg1] }) => arg0 % arg1;
