import {View, TouchableOpacity, TextInput, Image} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../styles/styles';
import styles from './searchbar.style';

const SearchBar = props => {
  const navigation = useNavigation();
  const [album, setAlbum] = useState(
    props.albums[Math.floor(Math.random() * props.albums.length)],
  );
  return (
    <View style={styles.elementsRow}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchBarText}
            placeholder="Album or Artist"
            placeholderTextColor={COLORS.red}
            cursorColor={COLORS.red}
            onChangeText={text => props.changeQuery(text)}
          />
        </View>
        <View style={styles.searchImageContainer}>
          <Image
            source={require('../../styles/search.png')}
            style={styles.searchImage}
          />
        </View>
      </View>
      {props.albums.length > 0 ? (
        <TouchableOpacity
          style={styles.randomButtonContainer}
          onPress={() => {
            navigation.navigate('Album', {
              title: album.title,
              artist: album.artist,
              cover: album.cover,
            });
            setAlbum(
              props.albums[Math.floor(Math.random() * props.albums.length)],
            );
          }}>
          <Image
            source={require('../../styles/dices.png')}
            style={styles.raondomImage}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.randomButtonContainer}>
          <Image
            source={require('../../styles/dices.png')}
            style={styles.raondomImage}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
