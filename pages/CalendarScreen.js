import React, {useState, useEffect} from 'react';
import {StyleSheet, Button, View, Text, ScrollView} from 'react-native';
import Calendar from '../components/Calendar';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const CalendarScreen = ({navigation, route}) => {
  let username = route.params.user;

  const onAddData = () => {
    navigation.navigate('Result', {user: username});
  };
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

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
        });

        setNotes(period_tracker);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     getData();
  //   }
  // }, [user]);

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Period Tracker</Text>
      <View style={styles.content}>
        <View style={styles.calendar}>
          <Calendar notes={notes} />
        </View>
        <View style={styles.viewHorizontal}>
          <Button title="Return" onPress={onAddData} color="#B25B6E" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    padding: 20,
  },
  content: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    width: '100%',
    margin: 10,
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7D3042',
  },
  calendar: {
    backgroundColor: '#f9cdd43b',
    borderRadius: 8,
    padding: 10,
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
});

export default CalendarScreen;
