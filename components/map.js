import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

export default function PlaceMap(props) {
  const [mapWidth, setMapWidth] = useState('99%');

  const {place, address, localisation} = props.placeInfo;
  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  // Request geolocation in Android since it's not done automatically
  const requestGeoLocationPermission = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
        style={[styles.map, {width: mapWidth}]}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        onMapReady={() => {
          requestGeoLocationPermission();
          updateMapStyle();
        }}
        initialRegion={{
          latitude: localisation[0],
          longitude: localisation[1],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: localisation[0],
            longitude: localisation[1],
          }}>
          <Callout style={{flex: 1, position: 'absolute'}}>
            <Text style={{textAlign: 'center'}}>{place}</Text>
            <Text> {address}</Text>
          </Callout>
        </Marker>
      </MapView>
      <TouchableOpacity style={styles.closeBtn}>
        <Icon
          name="cancel"
          size={40}
          style={{color: '#f4511e', left: 10, top: 10}}
          onPress={() => props.closeModalMapHandler()}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
