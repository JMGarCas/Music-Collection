import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './albumcounter.style';

const AlbumCounter = ({albums, shownAlbums, totalAlbums}) => {
  const navigation = useNavigation();
  const [album, setAlbum] = useState(
    albums[Math.floor(Math.random() * albums.length)],
  );

  return (
    <View style={styles.Wrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Album', {
            title: album.title,
            artist: album.artist,
            cover: album.cover,
            lang: '',
          });
          setAlbum(albums[Math.floor(Math.random() * albums.length)]);
        }}
        onLongPress={() => {
          navigation.navigate('Album', {
            title: album.title,
            artist: album.artist,
            cover: album.cover,
            lang: 'es',
          });
          setAlbum(albums[Math.floor(Math.random() * albums.length)]);
        }}>
        <Text style={styles.DefaultText}>
          Showing <Text style={styles.Number}>{shownAlbums}</Text> /{' '}
          <Text style={styles.Number}>{totalAlbums}</Text> albums
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlbumCounter;
