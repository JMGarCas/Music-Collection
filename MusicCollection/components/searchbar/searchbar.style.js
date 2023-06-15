import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../styles/styles";

const styles = StyleSheet.create({
 elementsRow: {
    flexDirection: "row",
    marginHorizontal: SIZES.xSmall,
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    width: "82%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical:SIZES.small,
    height: 40,
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
  randomButtonContainer: {
    justifyContent: "center",
    width: 42,
    height: 40,
  },
  raondomImage:{
    width: "70%",
    height: "70%",
  }
});

export default styles;
