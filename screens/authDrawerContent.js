import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {Title, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function AuthDrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <View>
        <View
          style={{
            flexDirection: 'column',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <Icon name="airballoon" color="orange" size={100} />
          <Title style={styles.title}>Cracov Information</Title>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="rocket" color={color} size={size} />
            )}
            label="Explore"
            onPress={() => {
              props.navigation.navigate('Explore');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="compass" color={color} size={size} />
            )}
            label="Things To Do"
            onPress={() => {
              props.navigation.navigate('ThingsToDo');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="account-key" color={color} size={size} />
            )}
            label="Login"
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="auto-fix" color={color} size={size} />
            )}
            label="About"
            onPress={() => {
              props.navigation.navigate('About');
            }}
          />
        </Drawer.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },

  drawerSection: {
    marginTop: 15,
  },
});
