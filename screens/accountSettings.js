import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SecureStorage from 'react-native-secure-storage';
import AccountFormElement from '../components/accountFormElement';
import NewPasswordForm from '../components/newPasswordForm';
import {AuthContext} from '../components/context';
import {UserContext} from '../components/context';

import * as yup from 'yup';
const newNameValidationSchema = yup.object({
  new_name: yup.string().required().min(1).max(10),
});
const newSurnameValidationSchema = yup.object({
  new_surname: yup.string().required().min(1).max(10),
});
const newEmailValidationSchema = yup.object({
  new_email: yup.string().required().email(),
});
export default function AccountSettings({navigation}) {
  const {signIn, signOut} = useContext(AuthContext);
  const {userData} = useContext(UserContext);

  const handleChangeUserData = async (values) => {
    const token = await SecureStorage.getItem('token');
    let updateUserData = {
      first_name: userData['first_name'],
      last_name: userData['last_name'],
      email: userData['email'],
    };

    if (values.new_name) {
      const new_first_name = values.new_name;
      updateUserData = {...updateUserData, new_first_name};
    } else if (values.new_surname) {
      const new_last_name = values.new_surname;
      updateUserData = {...updateUserData, new_last_name};
    } else if (values.new_email) {
      const new_email = values.new_email;
      updateUserData = {...updateUserData, new_email};
    } else {
      alert('Unautorized Operation!');
    }
    console.log('token' + token);
    fetch('http://10.0.2.2:8080/api/users/updateuserdata', {
      method: 'PUT',
      body: JSON.stringify(updateUserData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        signIn(res.token);
      })
      .catch((err) => alert(err));
  };

  const handleNewPassword = async (values) => {
    let updatePassword = {
      email: userData['email'],
      password: values.old_password,
      new_password: values.new_password,
    };
    console.log(updatePassword);
    fetch('http://10.0.2.2:8080/api/users/password', {
      method: 'PUT',
      body: JSON.stringify(updatePassword),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        signOut();
        setTimeout(function () {
          alert(
            'Password changed successfully, for seccure ressons, please log in again.',
          );
        }, 2000);
        navigation.navigate('Login');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.userDataContainer}>
          <AccountFormElement
            value={'new_name'}
            valueName={'Name'}
            placeholder={'New Name'}
            validSchema={newNameValidationSchema}
            apiValueName={'first_name'}
            handleChangeUserData={handleChangeUserData}
          />
          <AccountFormElement
            value={'new_surname'}
            valueName={'Surname'}
            placeholder={'New Surname'}
            validSchema={newSurnameValidationSchema}
            apiValueName={'last_name'}
            handleChangeUserData={handleChangeUserData}
          />
          <AccountFormElement
            value={'new_email'}
            valueName={'Email'}
            placeholder={'New Email'}
            validSchema={newEmailValidationSchema}
            apiValueName={'email'}
            handleChangeUserData={handleChangeUserData}
          />
        </View>
        <View>
          <NewPasswordForm handleNewPassword={handleNewPassword} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: 'lightsalmon',
  },
  userDataContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});
