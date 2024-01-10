import React, { useContext } from "react";
import { SafeAreaView, Text } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { FONT } from "../../constants/theme";

function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Profile</Text>
      <MaterialIcons
        name="person"
        size={32}
        style={{
          marginTop: 10,
        }}
        color="black"
      />
      <Text
        style={{
          fontSize: 14,
          fontFamily: FONT.bold,
        }}
      >
        {user.fullName}
      </Text>
    </SafeAreaView>
  );
}

export default Profile;
