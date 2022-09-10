import { InstructionToken } from "../lang/instructions.ts";
import { DataToken, KnownDataTokens } from "../lang/token.ts";
import { matchToken } from "./parser.ts";

const nulledCallback = () => null;

export class ExpressionMachine {
  private instruction: InstructionToken | null = null;
  private callback: <T>(...args: Array<T>) => void = nulledCallback;
  private params: Array<KnownDataTokens> = [];

  setInstruction = (
    instruction: InstructionToken,
  ) => (this.instruction = instruction);

  setMachineInstructionCallback = (
    callback: () => void,
  ) => {
    this.callback = callback;
  };

  pushParam = (param: KnownDataTokens) => this.params.push(param);

  exec = () => {
    if ((this.instruction as InstructionToken).params) {
      (this.instruction as InstructionToken).method?.({
        machineInstruction: (data: unknown) => this.callback(data),
        args: this.params,
      });
    } else {
      this.callback();
    }

    
    this.reset();
  };

  reset = () => {
    this.instruction = null;
    this.callback = nulledCallback;
    this.params = [];
  };
}
