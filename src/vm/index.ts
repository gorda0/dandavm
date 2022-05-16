//import { Instruction } from "../parse/token";
import { Context } from "../context";
import { ExpressionMachine } from "./em";

// TODO: remove console logs and create a better log interface

interface VMState {
  contexts?: {
    [contextName: string]: Context;
  } | null;
  currentContext?: string | null;
  currentScope?: string | null;
}

const freshState: VMState = {
  contexts: null,
  currentContext: null,
  currentScope: null,
};

export class VM  {
  //signature to turn a vm instance into an indexable class 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;

  private state: VMState;

  fetching = false;
  expressionMachine: ExpressionMachine = new ExpressionMachine();

  constructor(vmState: VMState = freshState) {
    this.state = vmState;
  }

  //context methods
  pushContext = (context: Context) => {
    ////console.log("pushing context to vm contexts", context);
    this.state.contexts = {
      ...this.state.contexts,
      [context.name]: context,
    };

    this.state.currentContext = context.name;
  };

  process = (tokens: any) => {
    let paramLength = 0;
    let paramIndex = 0;

    for (const token of tokens) {
      if (!this.fetching) {
        if (token.method && token.params && token.params > 0) {
          console.log("found instruction:", token.symbol);
          this.fetching = true;
          console.log("set fetching to:", this.fetching);
          console.log("pushing instruction to expression machine");
          this.expressionMachine.setInstruction(token);

          if (token.instructionCallback) {
            console.log("pushing instruction callback to expression machine");
            this.expressionMachine.setInstructionCallback(
              this[token.instructionCallback]
            );
          }

          paramLength = token.params;
        }
      } else {
        // fetch

        if (paramIndex < paramLength) {
          paramIndex++;
          console.log("fetching param: ", paramIndex, token);

          this.expressionMachine.pushParam(token);

          if (paramIndex === paramLength) {
            paramIndex = 0;
            paramLength = 0;
            this.fetching = false;
            console.log(
              "executing expression and reseting expression machine state"
            );
            this.expressionMachine.exec();
            this.expressionMachine.reset();
          }
        }
      }
    }
  };
}
