import {React, useState} from 'react';
import {Image, TouchableOpacity, useWindowDimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, FONTS} from './styles/styles';
import {RealmProvider} from './schemas/Album';
import styles from './components/header/screenheader.style';
import HomeScreen from './screens/HomeScreen';
import AlbumScreen from './screens/AlbumScreen';
import GoBackButton from './components/header/GoBackButton';
import ModalButtonHomeScreen from './components/header/ModalButtonHomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  if (!RealmProvider) {
    return null;
  }

  const [arraySelected, setArraySelected] = useState(false);
  let {width} = useWindowDimensions();

  const ArrayButtonHomeScreen = () => {
    return (
      <TouchableOpacity
        style={styles.iconHeaderContainer}
        onPress={() => {
          setArraySelected(!arraySelected);
        }}>
        <Image
          source={
            arraySelected
              ? require('./styles/arraySelected.png')
              : require('./styles/arrayNotSelected.png')
          }
          resizeMode="cover"
          style={styles.iconHeaderImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <RealmProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{
              title: 'Music Collection',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: COLORS.grey},
              headerTitleStyle: {fontFamily: FONTS.bold, color: COLORS.red},
              headerLeft: () => <ModalButtonHomeScreen />,
              headerRight: () => <ArrayButtonHomeScreen />,
            }}>
            {() => <HomeScreen arraySelected={arraySelected} width={width} />}
          </Stack.Screen>

          <Stack.Screen
            name="Album"
            component={AlbumScreen}
            options={{
              title: 'Album',
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: COLORS.grey},
              headerTitleStyle: {fontFamily: FONTS.bold, color: COLORS.red},
              animation: 'slide_from_right',
              headerLeft: () => <GoBackButton />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RealmProvider>
  );
}

export default App;
