interface IDataBasic {
  status: number;
}

export interface IDataList<entity> extends IDataBasic {
  response: entity[] | string;
}

export interface IDataValue<entity> extends IDataBasic {
  response: entity | string;
}

export interface IDataSave<entity> extends IDataBasic {
  response: string;
  data?: entity;
}

export interface IDataDelete extends IDataBasic {
  response: string;
}

export interface IDataError extends IDataBasic {
  response: string;
}
