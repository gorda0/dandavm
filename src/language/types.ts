export enum DataTypes {
  STRING = "string",
  NUMBER = "number",
  IDENTIFIER = "identifier",
  BOOLEAN = "boolean",
}

export type KnownDataTypes = keyof typeof DataTypes;
