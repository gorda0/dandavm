import {
  ContextInstruction,
  GenericToken,
  LogicalInstruction,
  OperatorInstruction,
  ScopeInstruction,
  Token,
} from "../native/instructions.ts";

type ExpressionInstruction = Token<
  OperatorInstruction | LogicalInstruction | ContextInstruction | ScopeInstruction
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
    this.instruction?.method({
      instructionCallback: (data: unknown) =>
        this.callback?.(data),
      args: this.params,
    });

  reset = () => {
    // maybe it should be executed right after exec..
    this.instruction = null;
    this.callback = null;
    this.params = [];
  };
}
