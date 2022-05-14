import { Operator } from "../native/operators";
import { Logical } from "../native/logical";
import { Context } from "../context";
import { Instruction } from "../native/instructions";

type ExpressionInstruction = Instruction<
  Operator | Logical | any,
  string | number | any
> | null;

export class ExpressionMachine {
  private instruction: ExpressionInstruction = null;
  private instructionCallback: any = null;
  private params: Array<any> | null = [];

  setInstruction = (instruction: ExpressionInstruction) =>
    (this.instruction = instruction);

  setInstructionCallback = (instructionCallback: any) =>
    (this.instructionCallback = instructionCallback);

  pushParam = (param: any) => this.params?.push(param);

  exec = () =>
    this.instruction?.method({
      instructionCallback: (ctx: Context) => this.instructionCallback(ctx),
      args: this.params,
    });

  reset = () => {
    // maybe it should be executed right after exec..
    this.instruction = null;
    this.instructionCallback = null;
    this.params = [];
  };
}
