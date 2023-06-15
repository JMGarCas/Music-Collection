import {View, Text} from 'react-native';
import styles from './albumcounter.style';

const AlbumCounter = ({shownAlbums, totalAlbums}) => {
  return (
    <View style={styles.Wrapper}>
      <Text style={styles.DefaultText}>
        Showing <Text style={styles.Number}>{shownAlbums}</Text> /{' '}
        <Text style={styles.Number}>{totalAlbums}</Text> albums
      </Text>
    </View>
  );
};

export default AlbumCounter;
