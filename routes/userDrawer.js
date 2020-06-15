import React from 'react';
import {
  HomeScreen,
  ExploreScreen,
  ThingsToDoScreen,
  FindUserScreen,
  AccountSettingsScreen,
  AboutScreen,
} from './Stacks';
import {UserDrawerContent} from '../screens/userDrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';

const UserDrawer = createDrawerNavigator();

export default function RootUserDrawerNavigator() {
  return (
    <UserDrawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <UserDrawerContent {...props} />}>
      <UserDrawer.Screen name="Home" component={HomeScreen} />
      <UserDrawer.Screen name="Explore" component={ExploreScreen} />
      <UserDrawer.Screen name="ThingsToDo" component={ThingsToDoScreen} />
      <UserDrawer.Screen name="FindUser" component={FindUserScreen} />
      <UserDrawer.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
      />
      <UserDrawer.Screen name="About" component={AboutScreen} />
    </UserDrawer.Navigator>
  );
}
