import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../constants/theme";

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 0.6,
    borderColor: "#e0e0e0a6",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardContentContainer: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alginItems: "start",
    paddingVertical: 12,
  },
  creatorTextContainer: {
    alignSelf: "flex-start",
  },
  creator: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  titleContainer: {
    minWidth: "80%",
    maxWidth: "85%",
  },
  title: {
    fontSize: 15,
    fontFamily: FONT.bold,
    textTransform: "capitalize",
  },
  timeAgo: {
    fontSize: 12,
    color: "#9e9e9e",
    fontFamily: FONT.regular,
  },
});
