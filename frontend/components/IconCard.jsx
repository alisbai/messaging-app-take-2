import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function IconCard({ iconName, bgColor = "#C1BEF5" }) {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        height: 100,
      }}
    >
      <MaterialIcons name={iconName} size={36} color="black" />
    </View>
  );
}

export default IconCard;
