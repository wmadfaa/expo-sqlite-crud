import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.todoDB");

export enum ItemStatus {
  TODO,
  DONE,
}

export interface IItem {
  id: number;
  done: ItemStatus;
  value: string;
}

export function assetIsItem(data: any): asserts data is IItem {
  if (!(typeof data === "object")) {
    throw new Error('item must be of type "object"!');
  }
  if (!("id" in data && typeof data.id === "number")) {
    throw new Error(
      `"item.id" must be of type "number"! receive ${typeof data.id}`
    );
  }
  if (!("done" in data && (data.done === 0 || data.done === 1))) {
    throw new Error(
      `"item.done" must be of ether the Int 0 or 1 ! receive ${data.done}`
    );
  }
  if (!("value" in data && typeof data.value === "string")) {
    throw new Error(
      `"item.value" must be of type "string"! receive ${typeof data.value}`
    );
  }
}

export function createItemsTable() {
  return new Promise<SQLite.SQLResultSet>((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);",
        [],
        (_, resultList) => res(resultList)
      );
    }, rej);
  });
}

export async function getItems() {
  const resultSet = await new Promise<SQLite.SQLResultSet>((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from items;`, [], (_, resultList) =>
        res(resultList)
      );
    }, rej);
  });
  return resultSet.rows._array as IItem[];
}

export async function insertItem(text: string) {
  const resultSet = await new Promise<SQLite.SQLResultSet>((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
      tx.executeSql("select * from items", [], (_, resultList) =>
        res(resultList)
      );
    }, rej);
  });
  return resultSet.rows._array as IItem[];
}

export async function updateItemStatusToDone(id: number) {
  const resultSet = await new Promise<SQLite.SQLResultSet>((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql("update items set done = 1 where id = ?;", [id]);
      tx.executeSql("select * from items", [], (_, resultList) =>
        res(resultList)
      );
    }, rej);
  });
  const items = resultSet.rows._array as IItem[];
  const item = items.find((item) => item.id === id);
  assetIsItem(item);
  return { item, items };
}

export async function deleteItemById(id: number) {
  const resultSet = await new Promise<SQLite.SQLResultSet>((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql("delete from items where id = ?;", [id]);
      tx.executeSql("select * from items", [], (_, resultList) =>
        res(resultList)
      );
    }, rej);
  });
  return resultSet.rows._array as IItem[];
}
