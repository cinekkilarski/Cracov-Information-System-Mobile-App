import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.aboutHeader}>Author</Text>
      <Text style={styles.aboutHeader}>Marcin Mazur</Text>
      <Text style={[styles.aboutHeader, {height: 100}]}>
        Contact details{'\n'}
        email: cinek.mazur@gmail.com
      </Text>
      <Text style={[styles.aboutHeader, {height: 180, padding: 10}]}>
        Master's Thesis:{'\n'}Project and implementation of tourist information
        system of Kraków city– web and mobile application.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blanchedalmond',
    height: '100%',
    alignItems: 'center',
  },
  aboutHeader: {
    height: 50,
    width: 350,
    backgroundColor: 'darkred',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    fontSize: 25,
    textAlign: 'center',
    color: 'floralwhite',
    textAlignVertical: 'center',
  },
});
