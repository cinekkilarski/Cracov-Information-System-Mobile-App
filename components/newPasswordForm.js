import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {globalStyles} from '../styles/global';
import FlatButton from '../shared/button';
import {Formik} from 'formik';
import * as yup from 'yup';
const passwordValidationSchema = yup.object({
  old_password: yup
    .string()
    .required()
    .min(5, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  new_password: yup
    .string()
    .required()
    .min(5, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

export default function NewPasswordForm(props) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Formik
            initialValues={{
              old_password: '',
              new_password: '',
              confirm_password: '',
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.resetForm();
              props.handleNewPassword(values);
            }}>
            {(formikprops) => (
              <View style={{alignItems: 'center'}}>
                <Text style={[globalStyles.inputLabel, {color: 'navajowhite'}]}>
                  Current Password
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Old Password"
                  onChangeText={formikprops.handleChange('old_password')}
                  value={formikprops.values.old_password}
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.old_password &&
                    formikprops.errors.old_password}
                </Text>
                <Text style={[globalStyles.inputLabel, {color: 'navajowhite'}]}>
                  New Password
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="New Password"
                  onChangeText={formikprops.handleChange('new_password')}
                  value={formikprops.values.new_password}
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.new_password &&
                    formikprops.errors.new_password}
                </Text>
                <Text style={[globalStyles.inputLabel, {color: 'navajowhite'}]}>
                  Confirm New Password
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Confirm New Password"
                  onChangeText={formikprops.handleChange('confirm_password')}
                  value={formikprops.values.confirm_password}
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched.confirm_password &&
                    formikprops.errors.confirm_password}
                </Text>
                <FlatButton
                  text={`change password`}
                  onPress={formikprops.handleSubmit}
                  backgroundColor={'orange'}
                  width={300}
                  height={35}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'mediumvioletred',
    paddingBottom: 20,
  },
});
