import { Symbol } from "../domain/symbol.ts";
import { DataType } from "./types.ts";
import Opcode from "./opcode.ts";

export type OpcodeToken = {
  machineInstructionId?: string;
  params: number;
}
export type OpcodeMap = Record<number, OpcodeToken>;

export type DataToken<T> = {
  data: number | string | boolean;
  type: T;
};

export type NumberToken = DataToken<DataType.NUMBER>;
export type StringToken = DataToken<DataType.STRING>;
export type IdentifierToken = DataToken<DataType.IDENTIFIER>;
export type BooleanToken = DataToken<DataType.BOOLEAN>;
export type LiteralToken =
  | NumberToken
  | StringToken
  | IdentifierToken
  | BooleanToken;
export type DataSet = Array<LiteralToken | OpcodeToken>;



export interface InstructionToken extends OpcodeToken {
  symbol: Symbol;
  opcode: Opcode;
}
export type InstructionMap = Record<string, InstructionToken>;


