import { ArithmeticInstruction,LogicalInstruction,ContextInstruction, ScopeInstruction } from "../language/domain/instruction.ts";
import { LiteralToken } from "../language/domain/token.ts";

const nulledCallback = () => null;

export class ExpressionMachine {
  private instruction?: ArithmeticInstruction | LogicalInstruction | ContextInstruction  | ScopeInstruction;
  private callback: <T>(...args: Array<T>) => void = nulledCallback;
  private params: Array<LiteralToken> = [];

  setInstruction = (
    instruction: ArithmeticInstruction | LogicalInstruction | ContextInstruction,
  ) => (this.instruction = instruction);

  setMachineInstructionCallback = (
    callback: () => void,
  ) => {
    this.callback = callback;
  };

  pushParam = (param: LiteralToken) => this.params.push(param);

  exec = () => {
    if (this.params.length) {
        this.instruction?.({
          machineInstruction: (data) => this.callback(data),
          args: this.params as never,
        });
    } else {
      this.callback();
    }

    this.reset();
  };

  reset = () => {
    this.instruction = undefined;
    this.callback = nulledCallback;
    this.params = [];
  };
}
