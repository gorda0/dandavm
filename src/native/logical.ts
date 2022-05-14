export type Logical = (...args: boolean[]) => boolean;
// TODO: args
export const and: Logical = (...args) => args[0] && args[1];
export const or: Logical = (...args) => args[0] || args[1];
export const not: Logical = (...args) => !args[0];
export const lsst: Logical = (...args) => args[0] < args[1];
export const grtr: Logical = (...args) => args[0] > args[1];
export const equal: Logical = (...args) => args[0] === args[1];
export const diff: Logical = (...args) => args[0] !== args[1];
