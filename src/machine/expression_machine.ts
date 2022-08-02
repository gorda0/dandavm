import {
  InstructionToken,
} from "../lang/instructions.ts";

const nulledCallback = () => null

export class ExpressionMachine {
  private instruction: InstructionToken | null = null;
  private callback: (<T>(...args: Array<T>) => void) = nulledCallback;
  private params: any = [];

  setInstruction = (
    instruction: InstructionToken,
  ) => (this.instruction = instruction);

  setInstructionCallback = (
    callback: () => void,
  ) => {
    this.callback = callback
  };

  pushParam = (param: any) => this.params.push(param);

  exec = () =>
    (this.instruction as InstructionToken).params ? (this.instruction as InstructionToken).method?.({
      instructionCallback: (data: unknown) =>
        this.callback(data),
      args: this.params,
    }) : this.callback();

  reset = () => {
    // maybe it should be executed right after exec..
    this.instruction = null;
    this.callback = nulledCallback;
    this.params = [];
  };
}
