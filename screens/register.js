import React, {useContext} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
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

const registerValidationSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(5, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function RegisterForm({navigation}) {
  const signIn = useContext(AuthContext);

  const handleRegisterRequest = (values) => {
    const registerData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };
    fetch('http://10.0.2.2:8080/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigation.popToTop();
        } else {
          throw Error(res.status);
        }
      })
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAwareScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={globalStyles.container}>
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={registerValidationSchema}
            onSubmit={(values, actions) => {
              actions.resetForm();
              handleRegisterRequest(values);
            }}>
            {(formikprops) => (
              <View>
                <Text style={globalStyles.inputLabel}>First Name</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Your First Name"
                  onChangeText={formikprops.handleChange('first_name')}
                  value={formikprops.values.first_name}
                  onBlur={formikprops.handleBlur('first_name')} //real time valid
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.email && formikprops.errors.first_name}
                </Text>
                <Text style={globalStyles.inputLabel}>Last Name</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Your Last Name"
                  onChangeText={formikprops.handleChange('last_name')}
                  value={formikprops.values.last_name}
                  onBlur={formikprops.handleBlur('last_name')} //real time valid
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.email && formikprops.errors.last_name}
                </Text>
                <Text style={globalStyles.inputLabel}>Email</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Your Email"
                  onChangeText={formikprops.handleChange('email')}
                  value={formikprops.values.email}
                  onBlur={formikprops.handleBlur('email')}
                />
                <Text style={globalStyles.inputValErr}>
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
                <Text style={globalStyles.inputLabel}> Confirm Password</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Your Password"
                  onChangeText={formikprops.handleChange('confirm_password')}
                  value={formikprops.values.confirm_password}
                  onBlur={formikprops.handleBlur('confirm_password')}
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.confirm_password &&
                    formikprops.errors.confirm_password}
                </Text>
                <FlatButton
                  text="register"
                  onPress={formikprops.handleSubmit}
                  backgroundColor={'#00BFFF'}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
