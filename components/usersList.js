import React from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';

export default function UsersList(props) {
  const {users} = props;
  return (
    <View style={styles.table}>
      <Card containerStyle={styles.cardContainer}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.tableNames}>
            <Text
              style={{
                alignSelf: 'center',
              }}>
              Name
            </Text>
          </View>
          <View style={styles.tableNames}>
            <Text
              style={{
                alignSelf: 'center',
              }}>
              Surname
            </Text>
          </View>
          <View style={[styles.tableNames, {width: '50%'}]}>
            <Text
              style={{
                alignSelf: 'center',
              }}>
              Email
            </Text>
          </View>
        </View>
      </Card>

      <FlatList
        contentContainerStyle={{marginTop: 30}}
        data={users}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <ScrollView>
            <Card containerStyle={styles.cardContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={styles.nameColumn}>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}>
                    {item.first_name}
                  </Text>
                </View>
                <View style={styles.surnameColumn}>
                  <Text
                    style={{
                      alignSelf: 'center',
                    }}>
                    {item.last_name}
                  </Text>
                </View>
                <View style={styles.emailColumn}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                    }}>
                    {item.email}
                  </Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    marginTop: 4,
  },
  table: {
    marginTop: 5,
    height: 330,
  },
  flatList: {
    marginTop: 30,
    marginBottom: 30,
  },
  nameColumn: {
    width: '25%',
    height: 30,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  surnameColumn: {
    width: '25%',
    height: 30,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  emailColumn: {
    width: '50%',
    height: 30,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  tableNames: {
    width: '25%',
    height: 30,
    backgroundColor: 'turquoise',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
});
