export enum ScopeKind {
  //DATA_SCOPE =  "data_scope",
  CONTEXT_SCOPE = "context_scope",
}

export type ScopeRelation = {
  id: string;
  origin: string;
  kind: ScopeKind;
};

export type ScopeBody = {
  variables: unknown;
  methods: unknown;
  watchers: unknown;
};

export type ScopeMethod = Record<ScopeKind, (data: string) => void>;
