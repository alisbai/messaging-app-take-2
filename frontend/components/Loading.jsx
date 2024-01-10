import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants/theme";

function Loading() {
  return (
    <ActivityIndicator
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      size="large"
      color={COLORS.primary}
    />
  );
}

export default Loading;
