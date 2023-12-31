import {View, Text, Image, ScrollView, TouchableOpacity, useWindowDimensions} from 'react-native';
import {useEffect, useState} from 'react';
import styles from '../components/albumscreen/albumscreen.style';
import axios from 'axios';
import TrackCard from '../components/trackcard/TrackCard';
import RenderHTML from 'react-native-render-html';
import LASTFM_API_KEY from '../apikeys';

function AlbumScreen({route}) {
  const [buttonSelected, setButtonSelected] = useState('wiki');
  const [dataAlbum, setDataAlbum] = useState('');
  const [dataArtist, setDataArtist] = useState('');
  const [scrollValue, setScrollValue] = useState(0);
  const [language, setLanguage] = useState('');

  const {width} = useWindowDimensions();

  const fetchAlbumData = async () => {
    if (language == 'es') {
      await axios
        .get(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
            route.params.artist,
          )}&album=${encodeURIComponent(
            route.params.title,
          )}&lang=es&format=json`,
        )
        .then(albumResponse => setDataAlbum(albumResponse.data.album)).catch((error) => console.log(error));
    } else {
      await axios
        .get(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
            route.params.artist,
          )}&album=${encodeURIComponent(route.params.title)}&format=json`,
        )
        .then(albumResponse => setDataAlbum(albumResponse.data.album)).catch((error) => console.log(error));
    }
  };

  const fetchArtistData = async () => {
    if (language == 'es') {
      await axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
            route.params.artist,
          )}&api_key=88dde75fdbdd534902a5d406e748c527&lang=es&format=json`,
        )
        .then(artistResponse => setDataArtist(artistResponse)).catch((error) => console.log(error));
    } else {
      await axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
            route.params.artist,
          )}&api_key=88dde75fdbdd534902a5d406e748c527&format=json`,
        )
        .then(artistResponse => setDataArtist(artistResponse)).catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetchAlbumData();
    fetchArtistData();
  }, [language]);
  
  const wikiSelected = () => {
    if (dataAlbum == '') {
      fetchAlbumData();
    }
    if (typeof dataAlbum.wiki === 'undefined') {
      return (
        <>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnActivated}>
              <Text style={styles.textActivated}>Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('artist')}>
                Artist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDisabled}
              onPress={() => setButtonSelected('tracks')}>
              <Text style={styles.textDisabled}>Tracks</Text>
            </TouchableOpacity>
          </View>
          <NoAvailableContent />
        </>
      );
    } else {
      const textFormatted = dataAlbum.wiki.content
        .replaceAll('\n', '<br>')
        .replace('<a ', '<br><br><a style="color: #cf6679"');
      return (
        <View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnActivated}>
              <Text style={styles.textActivated}>Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('artist')}>
                Artist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnDisabled}
              onPress={() => setButtonSelected('tracks')}>
              <Text style={styles.textDisabled}>Tracks</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 32, marginVertical: 22}}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `
                <p style="color:white; letter-spacing: 1px; font-size: 16px; line-height: 30px;">${textFormatted}</p>
                `,
              }}
            />
          </View>
        </View>
      );
    }
  };

  const artistSelected = () => {
    if (dataArtist == '') {
      fetchArtistData();
    }
    if (
      typeof dataArtist.data === 'undefined' ||
      typeof dataArtist.data.artist === 'undefined'
    ) {
      return (
        <>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('wiki')}>
                Wiki
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnActivated}>
              <Text style={styles.textActivated}>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('tracks')}>
                Tracks
              </Text>
            </TouchableOpacity>
          </View>
          <NoAvailableContent />
        </>
      );
    } else {
      const textFormatted = dataArtist.data.artist.bio.content
        .replaceAll('\n', '<br>')
        .replace('<a ', '<br><br><a style="color: #cf6679"');
      return (
        <View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('wiki')}>
                Wiki
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnActivated}>
              <Text style={styles.textActivated}>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('tracks')}>
                Tracks
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal: 32, marginVertical: 22}}>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `
                <p style="color:white; letter-spacing: 1px; font-size: 16px; line-height: 30px;">${textFormatted}</p>
                `,
              }}
            />
          </View>
        </View>
      );
    }
  };

  const tracksSelected = () => {
    if (dataAlbum == '') {
      fetchAlbumData();
    }
    if (
      typeof dataAlbum.tracks === 'undefined' ||
      typeof dataAlbum.tracks.track[0] === 'undefined'
    ) {
      return (
        <>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnDisabled}
              onPress={() => setButtonSelected('wiki')}>
              <Text style={styles.textDisabled}>Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnDisabled}>
              <Text
                style={styles.textDisabled}
                onPress={() => setButtonSelected('artist')}>
                Artist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnActivated}>
              <Text style={styles.textActivated}>Tracks</Text>
            </TouchableOpacity>
          </View>
          <NoAvailableContent />
        </>
      );
    }
    return (
      <View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnDisabled}
            onPress={() => setButtonSelected('wiki')}>
            <Text style={styles.textDisabled}>Wiki</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDisabled}>
            <Text
              style={styles.textDisabled}
              onPress={() => setButtonSelected('artist')}>
              Artist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnActivated}>
            <Text style={styles.textActivated}>Tracks</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: 32}}>
          {dataAlbum.tracks.track.map((track, index) => (
              <TrackCard
                key={track.name}
                index={index + 1}
                track={track.name}
              />
          ))}
        </View>
      </View>
    );
  };

  const NoAvailableContent = () => {
    if (language == '') {
      return (
        <View style={styles.noAvailableContent}>
          <Text style={styles.noAvailableContentText}>
            [ NO AVAILABLE CONTENT ]
          </Text>
        </View>
    )} else {
      return (
        <View style={styles.noAvailableContent}>
          <Text style={styles.noAvailableContentText}>
            [ CONTENIDO NO DISPONIBLE ]
          </Text>
        </View>
    )};
  };

  return (
    <View style={styles.mainView}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false} onScroll={(event) => {
        setScrollValue(event.nativeEvent.contentOffset.y)
      }}>
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri: route.params.cover,
            }}
            resizeMode="cover"
            resizeMethod="scale"
            style={styles.coverImage}
          />
        </View>
        <Text style={styles.albumName}>{route.params.title}</Text>
        <Text style={styles.albumArtist}>{route.params.artist}</Text>
        {buttonSelected == 'wiki'
          ? wikiSelected()
          : buttonSelected == 'artist'
          ? artistSelected()
          : tracksSelected()}
      </ScrollView>

      {scrollValue <= 0 ? (<View style={{flexDirection: 'row'}}>
        {language == '' ? (
          <>
            <TouchableOpacity style={styles.languageTextContainerSelected}>
              <Text
                style={styles.languageTextSelected}
                onPress={() => setLanguage('')}>
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageTextContainerNotSelected}>
              <Text
                style={styles.languageTextNotSelected}
                onPress={() => setLanguage('es')}>
                ESP
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.languageTextContainerNotSelected}>
              <Text
                style={styles.languageTextNotSelected}
                onPress={() => setLanguage('')}>
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.languageTextContainerSelected}>
              <Text
                style={styles.languageTextSelected}
                onPress={() => setLanguage('es')}>
                ESP
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>): null}
    </View>
  );
}

export default AlbumScreen;
