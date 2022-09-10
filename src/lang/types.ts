export enum DataTypes {
  STRING = "STRING",
  NUMBER = "NUMBER",
  IDENTIFIER = "IDENTIFIER",
  BOOLEAN = "BOOLEAN",
}

export type KnownDataTypes = keyof typeof DataTypes;
