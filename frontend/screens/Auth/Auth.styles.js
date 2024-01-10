import { StyleSheet } from "react-native";
import { FONT } from "../../constants/theme";

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: FONT.bold,
    marginBottom: 20,
  },
  inputsContainer: {
    marginTop: 30,
    gap: 15,
  },
  inputStyle: {
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 5,
    minWidth: "80%",
    fontFamily: FONT.regular,
  },
  alreadyHaveAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  forgotPasswordText: {
    textAlign: "center",
    color: "#50C2C9",
    marginBottom: 20,
    fontFamily: FONT.regular,
  },
  signInText: {
    color: "#50C2C9",
    fontFamily: FONT.bold,
  },
  already: {
    fontFamily: FONT.regular,
  },
});
