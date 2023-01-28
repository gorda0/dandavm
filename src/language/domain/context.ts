import { ScopeBody } from "./scope.ts";

export class Context implements ScopeBody {
  name: string;
  clock = 0;

  //scope
  variables = {};
  methods = {};
  watchers = {};

  constructor(name: string) {
    this.name = name;
  }
}
