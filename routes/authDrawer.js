import React from 'react';
import {
  HomeScreen,
  ExploreScreen,
  ThingsToDoScreen,
  AccessFormsScreen,
  AboutScreen,
} from './Stacks';
import {AuthDrawerContent} from '../screens/authDrawerContent';
import {createDrawerNavigator} from '@react-navigation/drawer';

const AuthDrawer = createDrawerNavigator();

export default function RootAuthDrawerNavigator() {
  return (
    <AuthDrawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <AuthDrawerContent {...props} />}>
      <AuthDrawer.Screen name="Home" component={HomeScreen} />
      <AuthDrawer.Screen name="Explore" component={ExploreScreen} />
      <AuthDrawer.Screen name="ThingsToDo" component={ThingsToDoScreen} />
      <AuthDrawer.Screen name="Login" component={AccessFormsScreen} />
      <AuthDrawer.Screen name="About" component={AboutScreen} />
    </AuthDrawer.Navigator>
  );
}
