import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import ExploreCard from '../components/exploreCard';

export default function Explore({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/api/places/explore')
      .then((response) => response.json())
      .then((json) => setPlaces(json.result))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item}) => (
            <ExploreCard item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    backgroundColor: 'coral',
  },
  titleText: {},
});
