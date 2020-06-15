import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {UserContext} from '../components/context';
import {globalStyles} from '../styles/global';
import FlatButton from '../shared/button';
import {Formik} from 'formik';

export default function AccountFormElement(props) {
  const {userData} = useContext(UserContext);
  const {
    value,
    valueName,
    placeholder,
    validSchema,
    apiValueName,
    handleChangeUserData,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Formik
            initialValues={{[value]: ''}}
            validationSchema={validSchema}
            onSubmit={(values, actions) => {
              Keyboard.dismiss();
              actions.resetForm();
              handleChangeUserData(values);
            }}>
            {(formikprops) => (
              <View style={{alignItems: 'center'}}>
                <Text style={[globalStyles.inputLabel, {color: 'brown'}]}>
                  Current {valueName}: {userData[apiValueName]}
                </Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder={placeholder}
                  onChangeText={formikprops.handleChange(value)}
                  value={formikprops.values[value]}
                />
                <Text style={globalStyles.inputValErr}>
                  {formikprops.touched[value] && formikprops.errors[value]}
                </Text>
                <FlatButton
                  text={`change ${valueName}`}
                  onPress={formikprops.handleSubmit}
                  backgroundColor={'brown'}
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
    padding: 0,
    backgroundColor: 'lightsalmon',
  },
});
