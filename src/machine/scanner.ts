import { instructions } from "../language/instructions.ts";
import { KnownDataTokens } from "../language/token.ts";
import { DataTypes } from "../language/types.ts";
import { swapReverser } from "../utils/list.ts";

// TODO: handle literals and identifiers
const getDataType = (data: string): DataTypes => {
  if (data === "true" || data === "false") return DataTypes.BOOLEAN;

  if (+data >= 0) return DataTypes.NUMBER;
  
  return DataTypes.STRING;
};

export const matchDataToken = (data: string): KnownDataTokens => ({
  data,
  type: getDataType(data),
});

export const matchToken = (instruction: string) => {
  if (instruction in instructions) {
    return instructions[instruction];
  } else {
    return matchDataToken(instruction);
  }
};

export const scan = (data: string) => swapReverser(data.split(" ").map(matchToken));
