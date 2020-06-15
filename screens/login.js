import React, {useContext} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {globalStyles} from '../styles/global';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import {AuthContext} from '../components/context';

const loginValidationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(5, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
});

export default function LoginForm() {
  const {signIn} = useContext(AuthContext);

  const handleLoginRequest = (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    fetch('http://10.0.2.2:8080/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        signIn(res.token);
      })
      .catch((err) => {
        alert('Invalid login or password. Try again');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.container, {paddingTop: 50}]}>
        <Formik
          initialValues={{email: 'example1@mail.com', password: 'example1'}}
          validationSchema={loginValidationSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            handleLoginRequest(values);
          }}>
          {(formikprops) => (
            <View>
              <Text style={globalStyles.inputLabel}>Email</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Your Email"
                onChangeText={formikprops.handleChange('email')}
                value={formikprops.values.email}
                onBlur={formikprops.handleBlur('email')} //real time valid
              />
              <Text style={globalStyles.inputValErr}>
                {/* formikprops.touched.email - true when this fild is active */}
                {formikprops.touched.email && formikprops.errors.email}
              </Text>
              <Text style={globalStyles.inputLabel}>Password</Text>
              <TextInput
                //   secureTextEntry={true}
                //   keyboardType="default"
                style={globalStyles.input}
                placeholder="Your Password"
                onChangeText={formikprops.handleChange('password')}
                value={formikprops.values.password}
                onBlur={formikprops.handleBlur('password')}
              />
              <Text style={globalStyles.inputValErr}>
                {formikprops.touched.password && formikprops.errors.password}
              </Text>
              <FlatButton
                text="login"
                onPress={formikprops.handleSubmit}
                backgroundColor={'#32CD32'}
              />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
