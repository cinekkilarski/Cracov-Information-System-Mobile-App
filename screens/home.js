import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
  const iconsData = [
    {
      iconName: 'silverware',
      text: 'Restaurants',
    },
    {
      iconName: 'beer',
      text: 'Local Pubs',
    },
    {
      iconName: 'bank',
      text: 'Places',
    },
    {
      iconName: 'map-search',
      text: 'Directions',
    },
    {
      iconName: 'comment-multiple',
      text: 'Opinions',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.homeHeader}>Cracov City</Text>
        <Text
          style={{
            color: 'maroon',
            fontSize: 20,
            textAlign: 'justify',
            margin: 10,
          }}>
          {' '}
          Kraków (Cracow) is one of the largest and oldest cities in Poland,
          with the urban population of 756,441 (2008). Situated on the Vistula
          river (Polish: Wisła) in the Lesser Poland region, the city dates back
          to the 7th century.It was the capital of Poland from 1038 to 1596, the
          capital of the Grand Duchy of Kraków from 1846 to 1918, and the
          capital of Kraków Voivodeship from the 14th century to 1999. It is now
          the capital of the Lesser Poland Voivodeship.
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          style={[
            styles.homeHeader,
            {color: 'floralwhite', backgroundColor: 'orange'},
          ]}>
          Mobile App Offers
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          {iconsData.map((icon) => (
            <View style={{alignItems: 'center'}}>
              <Text style={{textAlign: 'center'}}>{icon.text}</Text>
              <Icon name={icon.iconName} color="orange" size={80} />
            </View>
          ))}
        </View>
        <View
          style={{backgroundColor: 'lightsalmon', height: 640, width: '100%'}}>
          <Image
            source={{uri: `http://10.0.2.2:8080/api/image/dragon.jpg`}}
            style={{
              height: 600,
              resizeMode: 'cover',
              margin: 20,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightsalmon',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeHeader: {
    marginTop: 10,
    height: 50,
    width: 300,
    backgroundColor: 'floralwhite',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
    color: 'orangered',
    borderRadius: 5,
  },
});
