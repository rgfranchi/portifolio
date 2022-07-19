export interface IListFunctionsAccess<entity> {
  list: entity[];
  baseUrl?: string;
  access: { update?: {}; delete?: {} };
  handleDeleteOpen(id: number): void;
}
