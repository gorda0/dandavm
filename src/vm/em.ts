import {
  ContextInstruction,
  GenericToken,
  LogicalInstruction,
  OperatorInstruction,
  ScopeAccessorInstruction,
  Token,
} from "../native/instructions.ts";

type ExpressionInstruction = Token<
  OperatorInstruction | LogicalInstruction | ContextInstruction | ScopeAccessorInstruction
>;

export class ExpressionMachine {
  private instruction: ExpressionInstruction | null = null;
  private callback: ((...args: Array<unknown>) => void) | null = null;
  private params: any = [];

  setInstruction = (
    instruction: ExpressionInstruction,
  ) => (this.instruction = instruction);

  setInstructionCallback = (
    callback: () => void,
  ) => {
    this.callback = callback
  };

  pushParam = (param: GenericToken) => this.params?.push(param);

  exec = () =>
    ({
      [+true]: () => this.instruction?.method?.({
      instructionCallback: (data: unknown) =>
        this.callback?.(data),
      args: this.params,
    }),
    [+false]: () => this.callback?.()
  })[+!!this.instruction?.params]();

  reset = () => {
    // maybe it should be executed right after exec..
    this.instruction = null;
    this.callback = null;
    this.params = [];
  };
}
