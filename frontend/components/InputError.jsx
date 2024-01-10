import React from "react";
import { Text } from "react-native";

function InputError({ error }) {
  return (
    error && (
      <Text
        style={{
          color: "red",
          paddingHorizontal: 10,
          paddingVertical: 2,
          fontSize: 12,
        }}
      >
        {error}
      </Text>
    )
  );
}

export default InputError;
