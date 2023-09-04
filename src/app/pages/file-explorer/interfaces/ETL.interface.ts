import { FSData } from './fs-data.interface';

export interface ETL {
  extract(): any;
  transform(data: any): FSData;
  load(): FSData;
}
