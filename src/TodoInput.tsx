import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export interface ITodoInputProps {
  onSubmit(value: string): void;
}

export const TodoInput: React.VFC<ITodoInputProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    if (text) {
      onSubmit(text);
      setText("");
    }
  };

  const handleOnChange = (val: string) => {
    setText(val);
  };

  return (
    <TextInput
      onChangeText={handleOnChange}
      onSubmitEditing={handleSubmit}
      placeholder="what do you need to do?"
      style={styles.input}
      value={text}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 1,
    margin: 16,
    padding: 16,
    fontSize: 16,
  },
});
