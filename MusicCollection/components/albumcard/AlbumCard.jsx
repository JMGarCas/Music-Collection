import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from '../../components/albumcard/albumcard.style';

const AlbumCard = ({
  title,
  artist,
  cover,
  id,
  changeDeleteId,
  changeModalOpen,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Album', {
          title: title,
          artist: artist,
          cover: cover,
          lang: '',
        })
      }
      onLongPress={() =>
        navigation.navigate('Album', {
          title: title,
          artist: artist,
          cover: cover,
          lang: 'es',
        })
      }>
      <View style={styles.coverContainer}>
        <Image
          source={{
            uri: cover,
          }}
          resizeMode="cover"
          style={styles.coverImage}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.albumName} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.albumArtist} numberOfLines={1}>
          {artist}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.xContainer}
        onPress={() => {
          changeDeleteId(id);
          changeModalOpen();
        }}>
        <Image
          source={require('../../styles/x.png')}
          resizeMode="cover"
          style={styles.xImage}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default AlbumCard;
