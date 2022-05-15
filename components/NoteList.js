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

  useEffect(() => {
    const subscriber = firestore()
      .collection('periodTracker')
      .onSnapshot(querySnapshot => {
        const team_notes = [];

        querySnapshot.forEach(documentSnapshot => {
          team_notes.push({
            key: documentSnapshot.id,
            date: moment(documentSnapshot.get('date')).format('ddd MMM DD'),
            mood: documentSnapshot.get('mood'),
            status: documentSnapshot.get('status'),
            note: documentSnapshot.get('note'),
          });
        });

        setNotes(team_notes);
        setLoading(false);
      });
    return () => subscriber();
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  const checkDate = status => {
    const day = 2;
    if (status === 'FIRST_DATE') {
      return 'First day of Period';
    } else if (status === 'ON_PERIOD') {
      return `DAY ${day}`;
    } else if (status === 'LAST_DATE') {
      return 'Last day of Period';
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.noteList}
        data={notes}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View style={styles.viewHorizontalNote}>
              <Text style={styles.mood}>{item.mood}</Text>
              <Text style={styles.status}>{checkDate(item.status)}</Text>
              <Text style={styles.date}>{item.date}</Text>
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
