import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './screenheader.style';

const GoBackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconContainer}
      onPress={() => {
        navigation.goBack();
      }}>
      <Image
        source={require('../../styles/back.png')}
        resizeMode="cover"
        style={styles.iconImage}
      />
    </TouchableOpacity>
  );
};

export default GoBackButton;
