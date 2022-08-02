/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogicalInstruction } from "../instructions.ts";

export const and: LogicalInstruction = ({ args: [arg0, arg1] }) => arg0 && arg1;
export const or: LogicalInstruction = ({ args: [arg0, arg1] }) => arg0 || arg1;
export const not: LogicalInstruction = ({ args: [arg0] }) => !arg0;
export const lsst: LogicalInstruction = ({ args: [arg0, arg1] }) => arg0 < arg1;
export const grtr: LogicalInstruction = ({ args: [arg0, arg1] }) => arg0 > arg1;
export const equal: LogicalInstruction = ({ args: [arg0, arg1] }) =>
  arg0 === arg1;
export const diff: LogicalInstruction = ({ args: [arg0, arg1] }) =>
  arg0 !== arg1;
export const greq: LogicalInstruction = ({ args: [arg0, arg1] }) =>
  arg0 >= arg1;
export const lseq: LogicalInstruction = ({ args: [arg0, arg1] }) =>
  arg0 <= arg1;
