import {View, StyleSheet, Button} from 'react-native';
import React, {useEffect} from 'react';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWVkb3gtcyIsImEiOiJjbGV5NGo3Z2cwOWQxM3lvNTRwOXh0N2NlIn0.0LJp5QXaKFxIhb4gMqmXag',
);
const HomeMap = ({navigation}: any) => {
  const initialCamera = {
    centerCoordinate: [-9.2353665, 32.2935008], // San Francisco
    zoomLevel: 4,
  };

  useEffect(() => {
    requestLocationPermission();
  });

  const getUserPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true},
    );
  };
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to show your current location on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted.');
        getUserPosition();
      } else {
        console.log('Location permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const handleMapLongPress = (event: any) => {
    console.log(event.geometry.coordinates);
  };
  return (
    <View>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} onLongPress={handleMapLongPress}>
          <MapboxGL.Camera {...initialCamera} />
        </MapboxGL.MapView>
      </View>
      <View style={styles.buttonHolder}>
        <Button
          onPress={() => navigation.navigate('Login', {name: 'Jane'})}
          title="Learn More"
        />
      </View>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '90%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  buttonHolder: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    alignSelf: 'center',
    paddingTop: 6,
  },
});
