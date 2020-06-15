import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default function ThingsToDo() {
  const [restaurants, setRestaurants] = useState(null);
  const [pubs, setPubs] = useState();
  const [places, setPlaces] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleLoadData = () => {
    fetch('http://10.0.2.2:8080/api/places/restaurants')
      .then((res) => res.json())
      .then((res) => {
        setRestaurants(res.restaurants);
      })
      .catch((error) => alert(error));

    fetch('http://10.0.2.2:8080/api/places/pubs')
      .then((res) => res.json())
      .then((res) => {
        setPubs(res.pubs);
      })
      .catch((error) => alert(error));

    fetch('http://10.0.2.2:8080/api/places/explore')
      .then((res) => res.json())
      .then((res) => {
        setPlaces(res.result);
      })
      .catch((error) => alert(error));
  };

  const _renderItem = ({item, index}) => {
    const urlImage = item.image.slice(22);
    let title;
    if (item.restaurantName) {
      title = item.restaurantName;
    } else if (item.pubName) {
      title = item.pubName;
    } else {
      title = item.place;
    }
    return (
      <View
        title={item.pubName}
        style={{
          backgroundColor: 'cornsilk',
          borderRadius: 5,
          height: 280,
        }}>
        <Image
          source={{uri: `http://10.0.2.2:8080/${urlImage}`}}
          style={styles.image}
        />
        <Text style={{fontSize: 20, padding: 2}}>{title}</Text>
        <Text>{item.address}</Text>
      </View>
    );
  };

  useEffect(() => {
    handleLoadData();
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'coral',
              paddingTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.carouselHeader}>
              <Text style={{fontSize: 20, color: 'firebrick'}}>
                Recommended Restaurants
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Carousel
                layout={'default'}
                data={restaurants}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
              />
            </View>
            <View style={styles.carouselHeader}>
              <Text style={{fontSize: 20, color: 'firebrick'}}>Nightlife</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Carousel
                layout={'default'}
                data={pubs}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
              />
            </View>
            <View style={styles.carouselHeader}>
              <Text style={{fontSize: 20, color: 'firebrick'}}>Places</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 20,
              }}>
              <Carousel
                layout={'default'}
                data={places}
                sliderWidth={300}
                itemWidth={300}
                renderItem={_renderItem}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 200,
    resizeMode: 'cover',
  },
  carouselHeader: {
    height: 50,
    width: 300,
    backgroundColor: 'floralwhite',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
});
