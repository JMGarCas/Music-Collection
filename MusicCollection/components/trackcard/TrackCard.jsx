import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './trackcard.style';

const TrackCard = ({index, track}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{index}</Text>
      </View>
      <View style={styles.trackContainer}>
        <Text style={styles.trackName} numberOfLines={2}>
          {track}
        </Text>
      </View>
    </View>
  );
};

export default TrackCard;
