import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../styles/styles";

const styles = StyleSheet.create({
  iconHeaderContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconHeaderImage: {
    width: 25,
    height: 25,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    height: 300,
    backgroundColor: COLORS.grey,
    marginHorizontal: -4,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, .70)",
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.small,
    height: 40,
    marginHorizontal: "10%",
  },
  searchBar: {
    flex: 1,
    borderRadius: SIZES.xxLarge,
    height: "120%",
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  searchBarText: {
    marginTop: 1,
    fontFamily: FONTS.medium,
    paddingHorizontal: SIZES.medium,
    color: COLORS.red,
  },
  iconContainer: {
    width: 25,
    height: 25,
    marginRight: SIZES.medium,
  },
  iconImage: {
    width: "100%",
    height: "100%",
  },
  actionBtnText: {
    textAlign:"center",
    width: 120,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    paddingVertical: 11,
  },
  actionBtn: {
    marginTop: SIZES.medium,
    borderRadius: SIZES.xxLarge,
    backgroundColor: COLORS.red,
    marginHorizontal: SIZES.medium,
  },
});

export default styles;
