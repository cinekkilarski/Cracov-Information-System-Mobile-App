import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Card} from 'react-native-elements';
import {globalStyles} from '../styles/global';
import FlatButton from '../shared/button';
import SecureStorage from 'react-native-secure-storage';
import {Formik} from 'formik';
import UsersList from '../components/usersList';

export default function FindUser() {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const handleFilter = async (values) => {
    const token = await SecureStorage.getItem('token');
    fetch(
      `http://10.0.2.2:8080/api/users?first_name=${values.name}&last_name=${values.surname}&email=${values.email}`,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + token,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.users);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleAllUsers = async () => {
    const token = await SecureStorage.getItem('token');
    console.log('token:' + token);
    fetch(`http://10.0.2.2:8080/api/users`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setUsers(res.users))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleAllUsers();
  }, []);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Formik
            initialValues={{name: '', surname: '', email: ''}}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.resetForm();
              handleFilter(values);
            }}>
            {(formikprops) => (
              <View style={{alignItems: 'center'}}>
                <Text style={[globalStyles.inputLabel, {color: 'turquoise'}]}>
                  Name
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="User's Name"
                  onChangeText={formikprops.handleChange('name')}
                  value={formikprops.values.name}
                />
                <Text style={[globalStyles.inputLabel, {color: 'turquoise'}]}>
                  Surname
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="User's Surname"
                  onChangeText={formikprops.handleChange('surname')}
                  value={formikprops.values.surname}
                />
                <Text style={[globalStyles.inputLabel, {color: 'turquoise'}]}>
                  Email
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="User's Email"
                  onChangeText={formikprops.handleChange('email')}
                  value={formikprops.values.email}
                />
                <View style={styles.buttons}>
                  <FlatButton
                    text="Display All"
                    onPress={() => handleAllUsers()}
                    backgroundColor={'grey'}
                    width={190}
                    height={40}
                  />
                  <FlatButton
                    text="Search"
                    onPress={formikprops.handleSubmit}
                    backgroundColor={'turquoise'}
                    width={190}
                    height={40}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
      {isLoading ? (
        <ActivityIndicator />
      ) : users.length ? (
        <UsersList users={users} />
      ) : (
        <Card>
          <Text style={{textAlign: 'center'}}>No results to display!</Text>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'azure',
    paddingBottom: 5,
  },
  item: {
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
});
