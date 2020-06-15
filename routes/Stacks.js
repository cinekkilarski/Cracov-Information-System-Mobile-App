import React from 'react';
import Home from '../screens/home';
import Explore from '../screens/explore';
import SinglePlace from '../screens/singlePlace';
import ThingsToDo from '../screens/thingsToDo';
import LoginForm from '../screens/login';
import RegisterForm from '../screens/register';
import About from '../screens/about';
import FindUser from '../screens/findUser';
import AccountSettings from '../screens/accountSettings';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from '../shared/header';

const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ThingsToDoStack = createStackNavigator();
const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const AboutStack = createStackNavigator();
const AccessFormsStack = createBottomTabNavigator();
const FindUserStack = createStackNavigator();
const AccountSettingsStack = createStackNavigator();

export function HomeScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Cracov Info" />
          ),
        };
      }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

export function ExploreScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Explore"
        component={Explore}
        options={({navigation}) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="Explore" />
            ),
          };
        }}
      />
      <ExploreStack.Screen name="Details" component={SinglePlace} />
    </ExploreStack.Navigator>
  );
}

export function ThingsToDoScreen() {
  return (
    <ThingsToDoStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Things To Do" />
          ),
        };
      }}>
      <ThingsToDoStack.Screen name="ThingsToDo" component={ThingsToDo} />
    </ThingsToDoStack.Navigator>
  );
}
export function LoginScreen() {
  return (
    <LoginStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Login Panel" />
          ),
        };
      }}>
      <LoginStack.Screen name="Sign In" component={LoginForm} />
    </LoginStack.Navigator>
  );
}
export function RegisterScreen() {
  return (
    <RegisterStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Register Panel" />
          ),
        };
      }}>
      <RegisterStack.Screen name="Sign Up" component={RegisterForm} />
    </RegisterStack.Navigator>
  );
}

export function AccessFormsScreen() {
  return (
    <AccessFormsStack.Navigator
      initialRouteName="Sign In"
      tabBarOptions={{
        activeTintColor: 'white',
        activeBackgroundColor: 'green',
        inactiveTintColor: 'green',
        inactiveBackgroundColor: 'white',
        labelStyle: {
          fontSize: 20,
          marginBottom: 10,
        },
      }}>
      <RegisterStack.Screen name="Sign In" component={LoginScreen} />
      <RegisterStack.Screen name="Sign Up" component={RegisterScreen} />
    </AccessFormsStack.Navigator>
  );
}

export function AboutScreen() {
  return (
    <AboutStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => <Header navigation={navigation} title="About" />,
        };
      }}>
      <AboutStack.Screen name="About" component={About} />
    </AboutStack.Navigator>
  );
}

export function FindUserScreen() {
  return (
    <FindUserStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Find User" />
          ),
        };
      }}>
      <FindUserStack.Screen name="FindUser" component={FindUser} />
    </FindUserStack.Navigator>
  );
}

export function AccountSettingsScreen() {
  return (
    <AccountSettingsStack.Navigator
      screenOptions={({navigation}) => {
        return {
          headerTitle: () => (
            <Header navigation={navigation} title="Account Settings" />
          ),
        };
      }}>
      <AccountSettingsStack.Screen
        name="AccountSettings"
        component={AccountSettings}
      />
    </AccountSettingsStack.Navigator>
  );
}
