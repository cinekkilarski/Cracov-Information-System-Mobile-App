import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function ExploreCard(props) {
  const {pageName, place, shortDescription, image} = props.item;

  return (
    <View style={styles.card}>
      <Image
        source={{uri: `http://10.0.2.2:8080/api/image/${pageName}.jpg`}}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={[styles.cardText, {fontWeight: 'bold'}]}>{place}</Text>
        <Text style={styles.cardText}>{shortDescription}</Text>
        <TouchableOpacity>
          <Button
            title="Go to Details"
            onPress={() => props.navigation.navigate('Details', pageName)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  image: {height: 200, resizeMode: 'stretch', margin: 5},
  buttonDetails: {},
  cardText: {
    textAlign: 'justify',
  },
});
