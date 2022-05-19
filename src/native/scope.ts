export enum ScopeKind {
  //DATA_SCOPE =  "data_scope",
  CONTEXT_SCOPE = "context_scope",
  //FUNCTION_SCOPE = "function_scope"
}

export type ScopeRelation = {
  id: string;
  origin: string;
  kind: ScopeKind;
};

export type ScopeBody = {
  variables: {};
  methods: {};
  watchers: {};
};

export type ScopeMethod = {
  [scopeKind in ScopeKind]: (data: any) => any;
};
