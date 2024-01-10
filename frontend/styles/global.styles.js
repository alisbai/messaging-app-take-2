import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../constants/theme";

export const globalStyles = StyleSheet.create({
  authBtnStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    minWidth: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  authBtnTextStyle: {
    color: COLORS.white,
    fontFamily: FONT.bold,
  },

  container: {
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
