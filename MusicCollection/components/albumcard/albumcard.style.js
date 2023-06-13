import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../styles/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
  },
  coverContainer: {
    width: 50,
    height: 50,
  },
  coverImage: {
    borderRadius:2,
    width: "100%",
    height: "100%",
  },
  xContainer: {
    width: 25,
    height: 25,
  },
  xImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: SIZES.small,
  },
  albumName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.red,
  },
  albumArtist: {
    fontSize: SIZES.small + 2,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    marginTop: 3,
  },
});

export default styles;
