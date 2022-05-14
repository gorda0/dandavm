export type Operator = (...args: number[]) => number;
// TODO: args
export const add: Operator = (...args) => args[0] + args[1];
export const subtract: Operator = (...args) => args[0] - args[1];
export const multiply: Operator = (...args) => args[0] * args[1];
export const divide: Operator = (...args) => args[0] / args[1];
export const mod: Operator = (...args) => args[0] % args[1];
