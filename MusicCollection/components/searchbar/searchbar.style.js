import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../styles/styles";

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical:SIZES.small,
    height: 40,
    marginHorizontal: SIZES.xLarge,
    borderRadius: SIZES.xxLarge,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  searchBar: {
    flex: 1,
    height: "120%",
  },
  searchBarText: {
    marginTop:2,
    fontFamily: FONTS.medium,
    color: COLORS.red,
    paddingHorizontal: SIZES.medium,
  },
  searchImageContainer: {
    width: 20,
    height: 20,
    marginRight: SIZES.medium,
  },
  searchImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
