import React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
import Calendar from './components/Calendar';

const CalendarScreen = ({navigation, route}) => {
  const onAddData = () => {
    navigation.navigate('Main');
  };

  const onCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Period Tracker</Text>
      <View style={styles.content}>
        <View style={styles.calendar}>
          <Calendar />
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
