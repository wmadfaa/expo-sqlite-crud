export type * from "expo-sqlite/build/index";

declare module "expo-sqlite" {
  export interface SQLResultSetRowList {
    length: number;
    item(index: number): any;
    _array: any[];
  }
}
