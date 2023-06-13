import {StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../styles/styles';

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.black,
    flex:1
  },
  coverContainer: {
    marginTop: 32,
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  albumName: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: SIZES.xLarge,
    fontFamily: FONTS.bold,
    color: COLORS.red,
    marginHorizontal: 32
  },
  albumArtist: {
    textAlign: 'center',
    marginTop: 3,
    fontSize: SIZES.large,
    fontFamily: FONTS.regular,
    color: COLORS.white,
    marginHorizontal: 32
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  btnActivated: {
    borderWidth: 2,
    borderColor: COLORS.red,
    borderRadius: SIZES.xxLarge,
    backgroundColor: COLORS.red,
    height: 40,
    width: 90,
    marginHorizontal: 8,
  },
  btnDisabled: {
    borderWidth: 2,
    borderColor: COLORS.red,
    borderRadius: SIZES.xxLarge,
    backgroundColor: COLORS.black,
    height: 40,
    width: 90,
    marginHorizontal: 8,
  },
  textActivated: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.white,
    paddingVertical: 9,
  },
  textDisabled: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    color: COLORS.red,
    paddingVertical: 9,
  },
  noAvailableContent: {
    marginVertical: 64
  },
  noAvailableContentText: {
    textAlign: 'center',
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: COLORS.red,
  }
});

export default styles;
