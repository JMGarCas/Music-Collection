import {useMemo, useState} from 'react';
import Slider from '@react-native-community/slider';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import {COLORS} from '../styles/styles';
import {useQuery} from '../schemas/Album';
import {useNavigation} from '@react-navigation/native';
import AlbumCard from '../components/albumcard/AlbumCard';
import AlbumCounter from '../components/albumscounter/AlbumCounter';
import SearchBar from '../components/searchbar/SearchBar';
import DeleteConfirmationModal from '../components/deleteconfirmmodal/DeleteConfirmModal';

function HomeScreen({arraySelected, width}) {
  const navigation = useNavigation();
  const [searchBarQuery, setSearchBarQuery] = useState('');
  const [albumToDelete, setAlbumToDelete] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [numColumns, setNumColumns] = useState(2);
  const {widthScreen} = useWindowDimensions();

  const result = useQuery('Album');

  if (searchBarQuery == '') {
    albums = useMemo(
      () =>
        result.sorted([
          ['artist', false],
          ['title', false],
        ]),
      [result],
    );
  } else {
    albums = useMemo(() =>
      result
        .filtered(
          `artist CONTAINS[c] '${searchBarQuery}' || title CONTAINS[c] '${searchBarQuery}'`,
        )
        .sorted([
          ['artist', false],
          ['title', false],
        ]),[searchBarQuery],
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <SearchBar
        albums={albums}
        changeQuery={letter => {
          setSearchBarQuery(letter);
        }}
      />

      {arraySelected ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          data={albums}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Album', {
                  title: item.title,
                  artist: item.artist,
                  cover: item.cover,
                })
              }>
              <Image
                source={{
                  uri: item.cover,
                }}
                resizeMode="cover"
                style={{width: width / numColumns, height: width / numColumns}}
              />
            </TouchableOpacity>
          )}
          numColumns={numColumns}
          key={numColumns}
          keyExtractor={item => item._id}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          data={albums}
          renderItem={({item}) => (
            <AlbumCard
              title={item.title}
              artist={item.artist}
              cover={item.cover}
              id={item._id}
              changeDeleteId={id => setAlbumToDelete(id)}
              changeModalOpen={() => setModalOpen(true)}
            />
          )}
          keyExtractor={item => item._id}
        />
      )}

      {arraySelected === true ? (
        <Slider
          style={{width: widthScreen, height: 35}}
          value={numColumns}
          onValueChange={setNumColumns}
          minimumValue={2}
          maximumValue={10}
          step={1}
          minimumTrackTintColor={COLORS.red}
          maximumTrackTintColor={COLORS.white}
          thumbTintColor={COLORS.red}
        />
      ) : null}

      <AlbumCounter shownAlbums={albums.length} totalAlbums={result.length} />

      <DeleteConfirmationModal
        modalOpen={modalOpen}
        albumToDelete={albumToDelete}
        changeModalClose={() => setModalOpen(false)}
      />
    </View>
  );
}

export default HomeScreen;
