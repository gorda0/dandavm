/* eslint-disable @typescript-eslint/no-unused-vars */
import { LogicalInstruction } from "./instructions";
// TODO: args
export const and: LogicalInstruction = ({ args }) => args[0] && args[1];
export const or: LogicalInstruction = ({ args }) => args[0] || args[1];
export const not: LogicalInstruction = ({ args }) => !args[0];
export const lsst: LogicalInstruction = ({ args }) => args[0] < args[1];
export const grtr: LogicalInstruction = ({ args }) => args[0] > args[1];
export const equal: LogicalInstruction = ({ args }) => args[0] === args[1];
export const diff: LogicalInstruction = ({ args }) => args[0] !== args[1];
