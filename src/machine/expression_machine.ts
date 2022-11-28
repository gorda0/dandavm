import { ArithmeticInstruction,LogicalInstruction,ContextInstruction } from "../language/domain/instruction.ts";
import { LiteralToken } from "../language/domain/token.ts";

const nulledCallback = () => null;

export class ExpressionMachine {
  private instruction?: ArithmeticInstruction | LogicalInstruction | ContextInstruction;
  private callback: <T>(...args: Array<T>) => void = nulledCallback;
  private params: Array<{data: string | boolean | number}> = [];

  setInstruction = (
    instruction: ArithmeticInstruction | LogicalInstruction | ContextInstruction,
  ) => (this.instruction = instruction);

  setMachineInstructionCallback = (
    callback: () => void,
  ) => {
    this.callback = callback;
  };

  pushParam = (param: {data: string | boolean | number}) => this.params.push(param);

  exec = () => {
    if (this.params.length) {
        this.instruction?.({
          machineInstruction: (data: unknown) => this.callback(data),
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
