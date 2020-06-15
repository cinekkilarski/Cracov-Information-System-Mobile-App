import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const globalStyles = StyleSheet.create({
  container: {
    height: windowHeight - 80,
    alignItems: 'center', //vertical center
    backgroundColor: 'orange',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    padding: 5,
    fontSize: 15,
    borderRadius: 6,
  },
  inputValErr: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 4,
    marginBottom: 5,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 3,
    fontSize: 18,
  },
});
