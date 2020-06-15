import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function FlatButton({
  text,
  onPress,
  backgroundColor,
  width,
  height,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.button,
          {backgroundColor: backgroundColor, width: width, height: height},
        ]}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});
