import { StyleSheet } from "react-native";

import { COLORS, FONTS, SIZES } from "../../styles/styles";

const styles = StyleSheet.create({
  confirmText: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONTS.bold,
    color: COLORS.red,
    marginBottom:28
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    height: 250,
    backgroundColor: COLORS.grey,
    marginHorizontal: -4,
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  actionBtnText: {
    textAlign: "center",
    fontFamily: FONTS.medium,
    color: COLORS.white,
    paddingVertical: 11,
  },
  actionBtn: {
    marginTop: SIZES.large,
    borderRadius: SIZES.xxLarge,
    backgroundColor: COLORS.red,
    marginHorizontal: SIZES.medium,
    width: 120,
    height: 40,
  },
});

export default styles;
