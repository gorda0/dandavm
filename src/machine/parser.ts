import { instructions } from "../lang/instructions.ts";
import { DataToken, KnownDataTokens } from "../lang/token.ts";
import { DataTypes, KnownDataTypes } from "../lang/types.ts";
import { swapReverser } from "../utils/list.ts";

const getDataType = (data: string): DataTypes => {
  if (data === "true" || data === "false") {
    return DataTypes.BOOLEAN;
  }

  if (!+data) {
    return DataTypes.STRING;
  }

  return DataTypes.NUMBER;
};

export const matchDataToken = (data: string): KnownDataTokens => ({
  data,
  type: getDataType(data),
});

// TODO: handle literals and identifiers
export const matchToken = (instruction: string) => {
  if (instruction in instructions) {
    return instructions[instruction];
  } else {
    return matchDataToken(instruction);
  }
};

export const scan = (data: string) => {
  console.log(swapReverser(data.split(" ").map(matchToken)));
  return swapReverser(data.split(" ").map(matchToken));
};
