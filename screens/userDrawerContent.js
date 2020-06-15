import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {Title, Caption, Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';
import {UserContext} from '../components/context';
export function UserDrawerContent(props) {
  const {signOut} = useContext(AuthContext);
  const {userData} = useContext(UserContext);

  return (
    <View style={{flex: 1}}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Icon name="account-circle" color="orange" size={50} />
            <View style={{marginLeft: 15}}>
              <Title style={styles.title}>
                {userData['first_name']} {userData['last_name']}
              </Title>
              <Caption style={styles.caption}>{userData['email']}</Caption>
            </View>
          </View>
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
              <Icon name="account-search" color={color} size={size} />
            )}
            label="Find User"
            onPress={() => {
              props.navigation.navigate('FindUser');
            }}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name="tune" color={color} size={size} />
            )}
            label="Account Settings"
            onPress={() => {
              props.navigation.navigate('AccountSettings');
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

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-run" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },

  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});
