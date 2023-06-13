import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS } from "../../styles/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 3,
    marginHorizontal: SIZES.medium
  },
  numberContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  trackContainer: {
    flex: 1,
    paddingHorizontal: SIZES.xSmall,
  },
  numberText: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.bold,
    color: COLORS.red,
    
  },
  trackName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.white,
    
  },
});

export default styles;
