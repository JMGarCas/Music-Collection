import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import {useEffect, useState} from 'react';
import {COLORS} from '../../styles/styles';
import styles from './screenheader.style';
import axios from 'axios';
import {useRealm} from '../../schemas/Album';
import LASTFM_API_KEY from '../../apikeys';

const ModalButtonHomeScreen = () => {
  const [dataAlbum, setDataAlbum] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [cover, setCover] = useState('');
  const realm = useRealm();
  
  useEffect(() => {
    if (dataAlbum.length != 0) {
      realm.write(() => {
        realm.create('Album', {
          title: dataAlbum.name,
          artist: dataAlbum.artist,
          cover: dataAlbum.image[3]['#text'],
        });
      });
    }
  }, [dataAlbum]);

  const fetchAlbumData = async () => {
    const response = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(artistName)}&album=${encodeURIComponent(albumName)}&format=json`,
    );

    setDataAlbum(response.data.album);
  };

  const coverNotPresent = () => {
    return (
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => {
          fetchAlbumData();
          setArtistName('');
          setAlbumName('');
          setCover('');
          setModalOpen(false);
        }}>
        <Text style={styles.actionBtnText}>Add Album</Text>
      </TouchableOpacity>
    );
  };

  const coverPresent = () => {
    return (
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => {
          realm.write(() => {
            realm.create('Album', {
              title: albumName,
              artist: artistName,
              cover: cover,
            });
          });
          setArtistName('');
          setAlbumName('');
          setCover('');
          setModalOpen(false);
        }}>
        <Text style={styles.actionBtnText}>Add Album</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.iconHeaderContainer}
        onPress={() => {
          setModalOpen(true);
        }}>
        <Image
          source={require('../../styles/add.png')}
          resizeMode="cover"
          style={styles.iconHeaderImage}
        />
      </TouchableOpacity>

      <Modal visible={modalOpen} transparent={true} animationType="fade">
        <View style={styles.modal}>
          <View style={styles.searchContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../styles/user.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchBarText}
                placeholder="Artist"
                placeholderTextColor={COLORS.red}
                cursorColor={COLORS.red}
                onChangeText={text => setArtistName(text)}
              />
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../styles/vinyl.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchBarText}
                placeholder="Album"
                placeholderTextColor={COLORS.red}
                cursorColor={COLORS.red}
                onChangeText={text => setAlbumName(text)}
              />
            </View>
          </View>

          <View style={styles.searchContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../../styles/cover.png')}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchBarText}
                placeholder="Cover (Custom Album)"
                placeholderTextColor={COLORS.red}
                cursorColor={COLORS.red}
                onChangeText={text => setCover(text)}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                setModalOpen(false);
              }}>
              <Text style={styles.actionBtnText}>Close</Text>
            </TouchableOpacity>
            {cover == '' ? coverNotPresent() : coverPresent()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalButtonHomeScreen;
