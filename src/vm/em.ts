import {
  Token,
  OperatorInstruction,
  LogicalInstruction,
  ContextInstruction,
  CallbackInstruction,
} from "../native/instructions";

type ExpressionInstruction = Token<
  OperatorInstruction | LogicalInstruction | ContextInstruction
>;

export class ExpressionMachine {
  private instruction: ExpressionInstruction | null = null;
  private callback: CallbackInstruction<any, any> | null = null;
  private params: Array<any> = [];

  setInstruction = (instruction: ExpressionInstruction) =>
    (this.instruction = instruction);

  setInstructionCallback = (callback: CallbackInstruction<any, any>) =>
    (this.callback = callback);

  pushParam = (param: any) => this.params?.push(param);

  exec = () =>
    this.instruction?.method({
      instructionCallback: (data: any) =>
        this.callback?.instructionCallback?.(data),
      args: this.params,
    });

  reset = () => {
    // maybe it should be executed right after exec..
    this.instruction = null;
    this.callback = null;
    this.params = [];
  };
}
