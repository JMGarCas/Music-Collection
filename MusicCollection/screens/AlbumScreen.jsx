import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import styles from '../components/albumscreen/albumscreen.style';
import axios from 'axios';
import TrackCard from '../components/trackcard/TrackCard';
import RenderHTML from 'react-native-render-html';
import LASTFM_API_KEY from '../apikeys';

function AlbumScreen({route}) {
  const [buttonSelected, setButtonSelected] = useState('wiki');
  const [dataAlbum, setDataAlbum] = useState('');
  const [dataArtist, setDataArtist] = useState('');

  const fetchAlbumData = async () => {
    if (route.params.lang == 'es') {
      await axios
        .get(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
            route.params.artist,
          )}&album=${encodeURIComponent(
            route.params.title,
          )}&lang=es&format=json`,
        )
        .then(albumResponse => setDataAlbum(albumResponse.data.album));
    } else {
      await axios
        .get(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
            route.params.artist,
          )}&album=${encodeURIComponent(route.params.title)}&format=json`,
        )
        .then(albumResponse => setDataAlbum(albumResponse.data.album));
    }
  };

  const fetchArtistData = async () => {
    if (route.params.lang == 'es') {
      await axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
            route.params.artist,
          )}&api_key=88dde75fdbdd534902a5d406e748c527&lang=es&format=json`,
        )
        .then(artistResponse => setDataArtist(artistResponse));
    } else {
      await axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
            route.params.artist,
          )}&api_key=88dde75fdbdd534902a5d406e748c527&format=json`,
        )
        .then(artistResponse => setDataArtist(artistResponse));
    }
  };

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
              source={{
                html: `
                <p style="color:white; textAlign:justify; letter-spacing: 1px; font-size: 16px; line-height: 30px;">${textFormatted}</p>
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
    console.log(dataArtist);
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
              source={{
                html: `
                <p style="color:white; textAlign:justify; letter-spacing: 1px; font-size: 16px; line-height: 30px;">${textFormatted}</p>
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
          {dataAlbum.tracks.track.map((track, index) => {
            return (
              <TrackCard
                index={index + 1}
                track={track.name}
                artist={route.params.artist}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const NoAvailableContent = () => {
    return (
      <View style={styles.noAvailableContent}>
        <Text style={styles.noAvailableContentText}>
          [ NO AVAILABLE CONTENT ]
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
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
    </View>
  );
}

export default AlbumScreen;
