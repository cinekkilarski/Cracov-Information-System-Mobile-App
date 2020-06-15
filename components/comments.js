import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Card} from 'react-native-elements';
import {UserContext} from '../components/context';
import SecureStorage from 'react-native-secure-storage';
import FlatButton from '../shared/button';

export default function Comments(props) {
  const {userData} = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComments] = useState('');
  const {pageName} = props;

  const handleAddComment = async () => {
    const token = await SecureStorage.getItem('token');
    if (userData['first_name'] && userData['last_name']) {
      const commentData = {
        place: pageName,
        first_name: userData['first_name'],
        last_name: userData['last_name'],
        text: newComment,
      };
      fetch('http://10.0.2.2:8080/api/comments', {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            alert('Thank You For Your Opinion!');
            setNewComments('');
            handleCommentsList();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert('Adding comments is only available for logged users!');
    }
  };

  const handleCommentsList = () => {
    fetch(`http://10.0.2.2:8080/api/comments/${pageName}`)
      .then((response) => response.json())
      .then((json) => setComments(json.data))
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleCommentsList();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text style={styles.header}>Comments</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => props.closeModalCommentsHandler()}>
          <Icon
            name="cancel"
            size={40}
            style={{
              color: '#f4511e',
              alignSelf: 'flex-end',
              right: 5,
              top: 5,
            }}
          />
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <View style={styles.containerList}>
              <FlatList
                nestedScrollEnabled={true}
                data={comments}
                keyExtractor={(item, index) => `${index}`}
                renderItem={({item}) => (
                  <Card
                    containerStyle={{
                      backgroundColor: 'chocolate',
                      borderWidth: 0,
                      borderRadius: 5,
                    }}>
                    <Text>
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text>{item.text}</Text>
                  </Card>
                )}
              />
            </View>
            <View style={{backgroundColor: 'wheat'}}>
              <TextInput
                multiline
                numberOfLines={6}
                style={styles.textInput}
                placeholder="Add Your Opinion"
                value={newComment}
                onChangeText={(text) => setNewComments(text)}
              />
              <View style={{margin: 10}}>
                <FlatButton
                  text="Add Comment"
                  onPress={() => {
                    if (newComment.length > 0) {
                      handleAddComment();
                    } else {
                      alert('Add some text');
                    }
                  }}
                  backgroundColor={'saddlebrown'}
                  width={'100%'}
                  height={50}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'wheat',
  },
  containerList: {
    height: 400,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    textAlignVertical: 'center',
    paddingLeft: 20,
    fontSize: 35,
    backgroundColor: 'wheat',
    color: 'saddlebrown',
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
  },
  textInput: {
    backgroundColor: 'floralwhite',
    height: 120,
    margin: 10,
    borderRadius: 5,
    fontSize: 20,
    textAlignVertical: 'top',
  },
});
