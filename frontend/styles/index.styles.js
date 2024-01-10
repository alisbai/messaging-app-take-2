import { StyleSheet } from "react-native";
import { FONT } from "../constants/theme";

export const styles = StyleSheet.create({
  textContainer: {
    gap: 20,
    alignItems: "center",
    marginVertical: 40,
    maxWidth: "80%",
  },
  title: { fontSize: 18, fontFamily: FONT.bold },
  subtitle: {
    textAlign: "center",
    fontFamily: FONT.regular,
    marginBottom: 45,
  },
});
