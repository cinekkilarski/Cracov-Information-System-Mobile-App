import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Card, Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlaceMap from '../components/map';
import Comments from '../components/comments';
import SecureStorage from 'react-native-secure-storage';

export default function SinglePlace({route}) {
  const pageName = route.params;
  const [isLoading, setLoading] = useState(true);
  const [place, setPlace] = useState([]);
  const [rating, setRating] = useState(null);
  const [modalMapOpen, setModalMapOpen] = useState(false);
  const [modalCommentsOpen, setModalCommentsOpen] = useState(false);

  async function ratingCompleted(rating) {
    const token = await SecureStorage.getItem('token');
    if (token) {
      const updateRate = {
        newGrade: rating,
      };
      fetch(`http://10.0.2.2:8080/api/places/explore/${pageName}/updaterate`, {
        method: 'PUT',
        body: JSON.stringify(updateRate),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            alert('Thank You For Your Rate');
            return res.json();
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .then((res) => {
          setRating(res.newAveGrade);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('Rating is only available for logged users!');
      setRating(place.rate.averageGrade);
    }
  }

  useEffect(() => {
    fetch(`http://10.0.2.2:8080/api/places/explore/${pageName}`)
      .then((response) => response.json())
      .then((json) => {
        setPlace(json.result);
        setRating(json.result.rate.averageGrade);
      })
      .catch((error) => calert(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Image
            source={{uri: `http://10.0.2.2:8080/api/image/${pageName}.jpg`}}
            style={styles.image}
          />
          <Card containerStyle={{borderRadius: 10}}>
            <Text style={{fontSize: 30, color: '#f4511e'}}>{place.place}</Text>
            <Text style={styles.historyText}>
              Address:{'\n'}
              {place.address}
            </Text>
            <View style={styles.modalsIcons}>
              <TouchableOpacity
                style={styles.map}
                onPress={() => setModalMapOpen(true)}>
                <Icon name="room" size={30} style={{color: '#f4511e'}} />
                <Text style={{color: '#f4511e'}}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.comments}
                onPress={() => setModalCommentsOpen(true)}>
                <Icon name="comment" size={30} style={{color: '#f4511e'}} />
                <Text style={{color: '#f4511e'}}>Comments</Text>
              </TouchableOpacity>
            </View>
            <Rating
              startingValue={rating}
              showRating
              fractions={1}
              onFinishRating={ratingCompleted}
              style={{right: 48}}
            />
          </Card>
          <Card
            title="Some history"
            containerStyle={{borderRadius: 10, marginBottom: 20}}>
            <Text style={styles.historyText}>{place.somehistory}</Text>
          </Card>
        </ScrollView>
      )}
      <Modal animationType="slide" visible={modalMapOpen}>
        <PlaceMap
          closeModalMapHandler={() => setModalMapOpen(false)}
          placeInfo={{
            place: place.place,
            address: place.address,
            localisation: place.localisation,
          }}
        />
      </Modal>
      <Modal animationType="slide" visible={modalCommentsOpen}>
        <Comments
          closeModalCommentsHandler={() => setModalCommentsOpen(false)}
          pageName={pageName}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'coral',
  },
  image: {
    height: 200,
    margin: 0,
  },
  historyText: {
    textAlign: 'justify',
  },
  icon: {
    color: '#f4511e',
  },
  map: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
  },
  comments: {
    position: 'absolute',
    alignItems: 'center',
    top: 90,
  },
  modalsIcons: {
    position: 'absolute',
    alignItems: 'center',
    right: 40,
    top: 10,
  },
});
