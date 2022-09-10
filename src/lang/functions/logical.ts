/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogicalInstruction } from "../instructions.ts";

export const and: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <boolean> arg0 && <boolean> arg1;
export const or: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <boolean> arg0 || <boolean> arg1;
export const not: LogicalInstruction = ({ args: [arg0] }) => !arg0;
export const lsst: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 < <number> arg1;
export const grtr: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 > <number> arg1;
export const equal: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 === <number> arg1;
export const diff: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 !== <number> arg1;
export const greq: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 >= <number> arg1;
export const lseq: LogicalInstruction = (
  { args: [{ data: arg0 }, { data: arg1 }] },
) => <number> arg0 <= <number> arg1;
