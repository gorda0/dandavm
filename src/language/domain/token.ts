import { Symbol } from "../domain/symbol.ts";
import { DataType } from "./types.ts";
import Opcode from "./opcode.ts";

export type OpcodeToken = {
  machineInstructionId?: string;
  params: number;
}
export type OpcodeMap = Record<number, OpcodeToken>;

export type DataToken<T, J extends DataType> = {
  data: T;
  type: J | DataType.RUNTIME_UNMATCHED_DATA_TYPE;
};

export type NumberToken = DataToken<number, DataType.NUMBER>;
export type StringToken = DataToken<string, DataType.STRING>;
export type IdentifierToken = DataToken<string, DataType.IDENTIFIER>;
export type BooleanToken = DataToken<boolean, DataType.BOOLEAN>;
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


