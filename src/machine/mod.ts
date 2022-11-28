import { Context } from "../language/domain/context.ts";
import {
  ScopeKind,
  ScopeMethod,
  ScopeRelation,
} from "../language/domain/scope.ts";
import {
  InstructionToken,
  LiteralToken,
  DataSet,
InstructionMap,
OpcodeMap,
OpcodeToken,
} from "../language/domain/token.ts";
import { ExpressionMachine } from "./expression_machine.ts";
import instructions from "../language/tokens.ts"
import operators from "../language/operators/mod.ts";
import statements from "../language/statements/mod.ts";

const instructionMap = { ...operators, ...statements };
// TODO: remove console logs and create a better log interface

interface VMState {
  contexts?: {
    [contextName: string]: Context;
  };
  currentContext: string;
  currentScope: ScopeRelation;
  nextScope: ScopeRelation;
  scopeStack: Array<ScopeRelation>;
}

const freshScope = {
  kind: <ScopeKind> "fresh_scope",
  id: "",
  origin: "",
};

const freshState: VMState = {
  contexts: {},
  currentContext: "",
  currentScope: freshScope,
  nextScope: freshScope,
  scopeStack: [],
};

export const burnInstruction = (instruction: InstructionToken): OpcodeMap => {
  return {
    [instruction.opcode]: {
      machineInstructionId: instruction.machineInstructionId,
      params: instruction.params,
    },
  }
}

export const burnInstructionMap = (
  freshInstructions: InstructionMap,
): OpcodeMap =>
  Object.keys(freshInstructions).reduce((prevMap, currKey) => ({
    ...prevMap,
    ...burnInstruction(freshInstructions[currKey]),
  }), {});

export class Machine {
  //signature to turn a vm instance into an indexable class
  // deno-lint-ignore no-explicit-any
  [key: string]: any;

  private state: VMState;
  // TODO: create a better state interface

  private fetching = false;
  // TODO: create toggleFetching, maybe?

  private expressionMachine = new ExpressionMachine();
  private readonly verbose: boolean;
  private opcodes: OpcodeMap = burnInstructionMap(instructions);
  // not shure if verbose should be readonly..
  // it would be cool to enable/disable verbose mode at runtime.

  //logging
  private logWrapper: (args: {
    instructionDescription: string;
  }, callback: () => void) => void = (
    { instructionDescription },
    callback,
  ) => ({
    [+true]: () => {
      console.log(instructionDescription);
      callback();
    },
    [+false]: callback,
  }[+!!this.verbose]());

  constructor(vmState: VMState = freshState, verbose = true) {
    this.state = vmState;
    this.verbose = verbose;
  }

  //context methods
  pushContext = (
    context: Context,
  ) => {
    console.log("pushing context to vm contexts: ", context.name);
    const { name } = context;
    const kind = ScopeKind.CONTEXT_SCOPE;
    this.state.contexts = {
      ...this.state.contexts,
      [name]: context,
    };

    this.state.currentContext = name;

    this.state.nextScope = {
      kind,
      id: name,
      origin: this.state.currentScope.id,
    };
  };

  // scope methods

  scopeMethods: ScopeMethod = {
    [ScopeKind.CONTEXT_SCOPE]: (id: string) => {
      this.state.currentContext = id;
    },
  };

  pushScope = (): void => {
    this.logWrapper({
      instructionDescription: "entering scope",
    }, () => {
      if (this.state.currentScope) {
        this.state.scopeStack?.push(this.state.currentScope);
      }
      const { kind, id } = this.state.nextScope;

      this.state.currentScope = this.state.nextScope;
      this.state.nextScope = freshScope;

      this.scopeMethods[kind](id);
    });
  };

  popScope = (): void => {
    this.logWrapper({
      instructionDescription: "popping scope",
    }, () => {
      const lastScope = <ScopeRelation> this.state.scopeStack.pop();

      if (lastScope.origin) {
        this.state.currentScope = lastScope;

        this.scopeMethods[lastScope.kind](lastScope.origin);
      } else if (lastScope.kind === <ScopeKind> "fresh_scope") {
        this.state.currentScope = freshState.currentScope;
      }
    });
  };

  //processing
  // TODO: handle logs outside of process method
  process = (
    tokens: Array<number | string | boolean>,
    paramLength = 0,
    paramIndex = 0,
  ): boolean => {
    const currentToken = tokens.pop();

    
    if (currentToken) {
      const instructionToken = this.opcodes[currentToken as number];
      if (!this.fetching) {
        if(instructionToken) {
          console.log("pushing instruction to expression machine");
          this.expressionMachine.setInstruction(instructionMap[currentToken as keyof typeof instructionMap]);
          if (instructionToken.machineInstructionId) {
            console.log(
              "pushing instruction callback to expression machine: ",
              instructionToken.machineInstructionId,
            );
            this.expressionMachine.setMachineInstructionCallback(
              this[instructionToken.machineInstructionId],
            );
          }
  
          if (
            instructionToken.params && instructionToken.params > 0
          ) {
            this.logWrapper({
              instructionDescription: "set fetching to: " + !this.fetching,
            }, () => {
              this.fetching = true;
  
              paramLength = <number> instructionToken.params;
            });
          } else {
            this.logWrapper({
              instructionDescription: instructionToken +
                " instruction does not take any params, executing it..",
            }, () => {
              this.expressionMachine.exec();
            });
          }
        }
      } else {
        console.log("entrou else")
        const dataToken = currentToken;
        if (paramIndex < paramLength) {
          this.logWrapper({
            instructionDescription: "fetching param: " + paramIndex + " " +
              currentToken,
          }, () => {
            paramIndex++;

            this.expressionMachine.pushParam({ data: dataToken as string | number | boolean });
            console.log(currentToken, "currentToken");
            if (paramIndex === paramLength) {
              this.logWrapper({
                instructionDescription:
                  "executing expression and reseting expression machine state",
              }, () => {
                this.fetching = false;
                paramIndex = 0;
                paramLength = 0;

                this.expressionMachine.exec();
                this.expressionMachine.reset();
              });
            }
          });
        }
      }

      return this.process(tokens, paramLength, paramIndex);
    }

    return true;
  };
}
