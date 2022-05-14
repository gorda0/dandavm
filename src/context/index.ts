import { mountScopeName } from "../utils/scope";

// TODO: create types.....................
export class Context {
  name: string;
  variables: any = {};
  methods: any = {};
  watchers: any = {};
  registers: any = {};
  clock: any = 0;

  constructor(name: string) {
    this.name = mountScopeName(name);
  }
}

type CreateContext = {
  instructionCallback: (context: Context) => null;
  args: string[];
};

export const createContext = ({
  instructionCallback,
  args,
}: CreateContext): Context | void => {
  try {
    const [name] = args;

    //console.log("creating context:", name);
    const context = new Context(name);
    instructionCallback(context);

    return context;
  } catch (err) {
    console.error(err);
  }
};
