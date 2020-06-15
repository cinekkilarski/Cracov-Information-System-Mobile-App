import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Header({navigation, title}) {
  const openMenuHandler = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <Icon
        name="menu"
        size={28}
        style={styles.icon}
        onPress={openMenuHandler}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center', //vertical center
    justifyContent: 'center', //horizontal center
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#f4511e',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    color: '#f4511e',
    left: 5,
  },
});
