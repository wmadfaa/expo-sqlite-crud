import * as TodoList from "./todo.module";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem, Text, TouchableOpacity } from "react-native";

interface IItemsListProps {
  data: TodoList.IItem[];
  onSetItemToDone(itemID: TodoList.IItem["id"]): void;
  onDeleteItem(itemID: TodoList.IItem["id"]): void;
}

export const ItemsList: React.VFC<IItemsListProps> = ({
  data,
  onSetItemToDone,
  onDeleteItem,
}) => {
  const renderItem: ListRenderItem<TodoList.IItem> = useCallback(({ item }) => {
    const handleOnPress = (itemID: TodoList.IItem["id"]) =>
      item.done ? onDeleteItem(itemID) : onSetItemToDone(itemID);

    return (
      <TouchableOpacity
        onPress={() => handleOnPress(item.id)}
        style={{
          backgroundColor: item.done ? "#1c9963" : "gray",
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text>
          ({item.id}) {item.value}{" "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          click to {item.done ? "delete" : "complete"}
        </Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList<TodoList.IItem>
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};
