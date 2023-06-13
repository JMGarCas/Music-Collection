import {View, TextInput, Image} from 'react-native';
import {COLORS} from '../../styles/styles';
import styles from './searchbar.style';

const SearchBar = props => {
  return (
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
  );
};

export default SearchBar;
