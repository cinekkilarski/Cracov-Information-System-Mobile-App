import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo} from 'react';
import RootAuthDrawerNavigator from './routes/authDrawer';
import RootUserDrawerNavigator from './routes/userDrawer';
import SecureStorage from 'react-native-secure-storage';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './components/context';
import {UserContext} from './components/context';
import jwt from 'jwt-decode';

async function asyncSecureStorageToken(token) {
  await SecureStorage.setItem('token', token);
}

async function asyncDeleteTokenFromSecureStorage() {
  await SecureStorage.removeItem('token');
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState([]);

  const authContext = useMemo(() => {
    return {
      signIn: (accessToken) => {
        let decoded = jwt(accessToken);
        setUserData(decoded);
        setUserToken(accessToken);
        asyncSecureStorageToken(accessToken);
        setIsLoading(false);
      },
      signOut: () => {
        setIsLoading(false);
        asyncDeleteTokenFromSecureStorage();
        setUserToken(null);
        setUserData(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={{userData}}>
        <NavigationContainer>
          {userToken ? (
            <RootUserDrawerNavigator />
          ) : (
            <RootAuthDrawerNavigator />
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
