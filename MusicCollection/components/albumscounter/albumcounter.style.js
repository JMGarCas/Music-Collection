import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../styles/styles';

const styles = StyleSheet.create({
  Wrapper: {
    paddingVertical: '2%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.grey,
    backgroundColor: COLORS.grey,
  },
  Number: {
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.red,
  },
  DefaultText: {
    textAlign: 'center',
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
});

export default styles;
