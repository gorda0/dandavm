enum Opcode {
  ADD = 0x1,
  SUBTRACT = 0x2,
  MULTIPLY = 0x3,
  DIVIDE = 0x4,
  MOD = 0x5,
  DATA = 0x6,
  CREATE_CONTEXT = 0x7,
  SCOPE_IN = 0x8,
  SCOPE_END = 0x9,
  OR = 0xA,
  AND = 0xB,
  NOT = 0xC,
  EQUAL = 0xD,
  GREATER_THAN = 0xE,
  GREATER_THAN_OR_EQUAL = 0xF,
  LESS_THAN = 0x10,
  LESS_THAN_OR_EQUAL = 0x11,
  NOT_EQUAL = 0x12,
}

export default Opcode;
