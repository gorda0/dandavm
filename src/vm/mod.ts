import { Context } from "../context.ts";
import {
  GenericToken,
  ScopeInstruction,
  Token,
} from "../native/instructions.ts";
import { ScopeKind, ScopeMethod, ScopeRelation } from "../native/scope.ts";
import { ExpressionMachine } from "./em.ts";

// TODO: remove console logs and create a better log interface


interface VMState {
  contexts?: {
    [contextName: string]: Context;
  };
  currentContext: string;
  currentScope: string;
  scopeStack: Array<ScopeRelation>;
}

const freshState: VMState = {
  contexts: {},
  currentContext: "",
  currentScope: "",
  scopeStack: [],
};

export class VM {
  //signature to turn a vm instance into an indexable class
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any

  private state: VMState;

  fetching = false;
  expressionMachine: ExpressionMachine = new ExpressionMachine();

  constructor(vmState: VMState = freshState) {
    this.state = vmState;
  }

  //context methods
  pushContext = (
    [context, { instructionCallbackId }]: [Context, Token<ScopeInstruction>],
  ) => {
    //console.log("pushing context to vm contexts: ", context.name);
    const { name } = context;
    const kind = ScopeKind.CONTEXT_SCOPE;
    this.state.contexts = {
      ...this.state.contexts,
      [name]: context,
    };

    this.state.currentContext = name;
    //this.pushScope(name, kind);
    if (instructionCallbackId) {
      this[instructionCallbackId as string](name, kind);
    }
  };
  // scope methods

  scopeMethods: ScopeMethod = {
    [ScopeKind.CONTEXT_SCOPE]: (id: string) => this.state.currentContext = id,
  };

  pushScope = (id: string, kind: ScopeKind): void => {
    console.log("entering scope for: ", id, " ", kind);

    this.state.scopeStack?.push({ id, kind, origin: this.state.currentScope });
    this.state.currentScope = id;

    this.scopeMethods[kind](id);
  };

  popScope = (): void => {
    console.log("popping scope");
    const lastScope = this.state.scopeStack.pop() as ScopeRelation;
    
    if (lastScope?.origin) {
      const nextScopeId = lastScope.origin;
      this.state.currentScope = nextScopeId;

      this.scopeMethods[lastScope?.kind](lastScope.origin);
    } else if (lastScope?.kind){
      this.state.currentScope = "";
      this.scopeMethods[lastScope?.kind]("");
    }
    //console.log(this.state);
  };

  process = (
    tokens: Array<GenericToken>,
    paramLength = 0,
    paramIndex = 0,
  ): boolean => {
    const currentToken = tokens.shift();

    if (currentToken) {
      if (!this.fetching) {
        //console.log("found instruction:", currentToken.symbol);
        //console.log("pushing instruction to expression machine");
        this.expressionMachine.setInstruction(currentToken);
        if (currentToken.instructionCallbackId) {
          // console.log(
          //   "pushing instruction callback to expression machine: ",
          //   currentToken.instructionCallbackId,
          // );
          this.expressionMachine.setInstructionCallback(
            this[currentToken.instructionCallbackId],
          );
        }

        if (
          currentToken.params && currentToken.params > 0
        ) {
          this.fetching = true;
          //console.log("set fetching to:", this.fetching);

          paramLength = currentToken.params;
        } else {
          //console.log(currentToken.symbol, " instruction does not take any params, executing it..");
          this.expressionMachine.exec();
          this.expressionMachine.reset();
        }
      } else {
        // fetch

        if (paramIndex < paramLength) {
          paramIndex++;
          //console.log("fetching param: ", paramIndex, currentToken);

          this.expressionMachine.pushParam(currentToken);

          if (paramIndex === paramLength) {
            paramIndex = 0;
            paramLength = 0;
            this.fetching = false;
            // console.log(
            //   "executing expression and reseting expression machine state",
            // );
            this.expressionMachine.exec();
            this.expressionMachine.reset();
          }
        }
      }

      return this.process(tokens, paramLength, paramIndex);
    }

    return true;
  };

  bProcess = (tokens: any) => {
    let paramLength = 0;
    let paramIndex = 0;

    for (const token of tokens) {
      if (!this.fetching) {
        if (token.method && token.params && token.params > 0) {
          //console.log("found instruction:", token.symbol);
          this.fetching = true;
          //console.log("set fetching to:", this.fetching);
          //console.log("pushing instruction to expression machine");
          this.expressionMachine.setInstruction(token);

          if (token.instructionCallback) {
            //console.log("pushing instruction callback to expression machine");
            this.expressionMachine.setInstructionCallback(
              this[token.instructionCallback],
            );
          }

          paramLength = token.params;
        }
      } else {
        // fetch

        if (paramIndex < paramLength) {
          paramIndex++;
          //console.log("fetching param: ", paramIndex, token);

          this.expressionMachine.pushParam(token);

          if (paramIndex === paramLength) {
            paramIndex = 0;
            paramLength = 0;
            this.fetching = false;
            // //console.log(
            //   "executing expression and reseting expression machine state"
            // );
            this.expressionMachine.exec();
            this.expressionMachine.reset();
          }
        }
      }
    }
  };
}
