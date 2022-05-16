/* eslint-disable @typescript-eslint/no-unused-vars */
import { OperatorInstruction } from "./instructions";
// TODO: args
export const add: OperatorInstruction = ({ args }) => args[0] + args[1];
export const subtract: OperatorInstruction = ({ args }) => args[0] - args[1];
export const multiply: OperatorInstruction = ({ args }) => args[0] * args[1];
export const divide: OperatorInstruction = ({ args }) => args[0] / args[1];
export const mod: OperatorInstruction = ({ args }) => args[0] % args[1];
