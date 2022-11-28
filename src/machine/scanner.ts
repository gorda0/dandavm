import nativeInstructionTokens from "../language/tokens.ts";
import {
  DataSet,
  InstructionMap,
  InstructionToken,
  LiteralToken,
  OpcodeMap,
} from "../language/domain/token.ts";
import { DataType } from "../language/domain/types.ts";
import { swapReverser } from "../utils/list.ts";

// TODO: handle literals and identifiers
const getDataType = (data: string): DataType => {
  if (data === "true" || data === "false") return DataType.BOOLEAN;

  if (+data >= 0) return DataType.NUMBER;

  return DataType.STRING;
};

const typeConversion = {
  [DataType.NUMBER]: Number,
  [DataType.BOOLEAN]: (input: string) => input === "true",
};

export const matchDataToken = (input: string): LiteralToken => {
  const type = getDataType(input);
  const data = type in typeConversion
    ? typeConversion[type as keyof typeof typeConversion](input)
    : input;

  return {
    data,
    type,
  };
};

export const matchToken = (input: string) => {
  if (input in nativeInstructionTokens) {
    return nativeInstructionTokens[input];
  } else {
    return matchDataToken(input);
  }
};

export const emit = (
  set: Array<LiteralToken | InstructionToken>,
): Array<number | string | boolean> =>
  set.map((item) =>
    (item as LiteralToken).data || (item as InstructionToken).opcode
  );

export const scan = (data: string) =>
  swapReverser(data.split(" ").map(matchToken));
