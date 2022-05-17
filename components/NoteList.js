import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Text, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const NoteList = props => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [isFirstDate, setFirstDate] = useState(false);
  const [isLastDate, setLastDate] = useState(false);
  const [status, setStatus] = useState('');
  const [timeStamp, setTimeStamp] = useState(new Date(1652344499));
  const [date, setDate] = useState();

  useEffect(() => {
    const subscriber = firestore()
      .collection('periodTracker')
      .orderBy('date', 'asc')
      .onSnapshot(querySnapshot => {
        const period_tracker = [];

        querySnapshot.forEach(documentSnapshot => {
          period_tracker.push({
            key: documentSnapshot.id,
            date: new Date(documentSnapshot.get('date').seconds * 1000),
            mood: documentSnapshot.get('mood'),
            isFirstDate: documentSnapshot.get('isFirstDate'),
            isLastDate: documentSnapshot.get('isLastDate'),
            note: documentSnapshot.get('note'),
            day: new Date(documentSnapshot.get('date').seconds * 1000),
          });
          setDate(documentSnapshot.get('date'));
          setFirstDate(documentSnapshot.get('isFirstDate'));
          setLastDate(documentSnapshot.get('isLastDate'));
        });
        setNotes(period_tracker);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  console.log(date);

  useEffect(() => {
    const day = Math.floor(Math.abs(date - timeStamp) / (1000 * 60 * 60 * 24));

    if (isFirstDate == true && isLastDate == false) {
      setStatus('First day of Period');
    } else if (isFirstDate == false && isLastDate == false) {
      setStatus(`DAY ${day}`);
    } else if (isFirstDate == false && isLastDate == true) {
      setStatus('Last day of Period');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstDate, isLastDate]);

  useEffect(() => {
    console.log('Notelist', notes);
  }, [notes]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.noteList}
        data={notes}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View style={styles.viewHorizontalNote}>
              <Text style={styles.mood}>{item.mood}</Text>
              <Text style={styles.status}>
                DAY {Math.abs(item.day.getDay() - 11)}
              </Text>
              <Text style={styles.date}>
                {moment(item.date).format('ddd MMM DD')}
                {/* {item.date.getDate()} */}
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
