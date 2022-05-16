import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const NoteList = props => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isFirstDate, setFirstDate] = useState(false);
  const [isLastDate, setLastDate] = useState(false);
  const [status, setStatus] = useState('');
  const [timeStamp, setTimeStamp] = useState(new Date());

  useEffect(() => {
    const subscriber = firestore()
      .collection('periodTracker')
      .onSnapshot(querySnapshot => {
        const period_tracker = [];

        querySnapshot.forEach(documentSnapshot => {
          period_tracker.push({
            key: documentSnapshot.id,
            date: documentSnapshot.get('date'),
            mood: documentSnapshot.get('mood'),
            isFirstDate: documentSnapshot.get('isFirstDate'),
            isLastDate: documentSnapshot.get('isLastDate'),
            note: documentSnapshot.get('note'),
          });
          setFirstDate(documentSnapshot.get('isFirstDate'));
          setLastDate(documentSnapshot.get('isLastDate'));
        });
        setNotes(period_tracker);
        setLoading(false);
      });
    return () => subscriber();
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  // const day = Math.floor(
  //   Math.abs(period_tracker.date - timeStamp) / (1000 * 60 * 60 * 24),
  // );

  // if (isFirstDate == true && isLastDate == false) {
  //   setStatus('First day of Period');
  //   setTimeStamp(documentSnapshot.get('date'));
  // } else if (isFirstDate == false && isLastDate == false) {
  //   setStatus(`DAY ${day}`);
  // } else if (isFirstDate == false && isLastDate == true) {
  //   setStatus('Last day of Period');
  // }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.noteList}
        data={notes}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View style={styles.viewHorizontalNote}>
              <Text style={styles.mood}>{item.mood}</Text>
              <Text style={styles.status}>{item.day}</Text>
              <Text style={styles.date}>
                {moment(item.date).format('ddd MMM DD')}
              </Text>
            </View>
            <Text style={styles.note}>{item.note}</Text>
          </View>
        )}
        keyExtractor={item => item.key}
      />
      <View style={styles.viewHorizontal}>
        <Button title="Return" onPress={props.onAddData} color="#B25B6E" />
        <Button title="Calendar" onPress={props.onCalendar} color="#B25B6E" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  noteList: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 5,
  },
  listItem: {
    padding: 15,
    fontSize: 18,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    height: 100,
    backgroundColor: '#f9cdd43b',
    borderRadius: 8,
    borderColor: 'pink',
    borderWidth: 2,
    shadowColor: 'pink',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewHorizontalNote: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginBottom: 40,
  },
  mood: {
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 26,
    color: '#E2758A',
    marginRight: 10,
  },
  status: {
    fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 16,
    color: '#EDA1AD',
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    fontWeight: '900',
    color: '#7C7777',
  },
  note: {
    fontFamily: 'Roboto',
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    padding: 5,
  },
});

export default NoteList;
