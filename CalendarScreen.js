import React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import {LocaleConfig} from 'react-native-calendars';
import { Calendar } from 'react-native-calendario';

import NoteList from './components/NoteList';

const CalendarScreen = ({navigation, route}) => {

  return (
    <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Period Tracker</Text>
        <Text style={styles.title}>Calendar</Text>
        <Calendar
            onChange={(range) => console.log(range)}
            minDate={new Date(2018, 3, 20)}
            startDate={new Date(2018, 3, 30)}
            endDate={new Date(2018, 4, 5)}
            style={styles.calendar}
            theme={{
                activeDayColor: {},
                monthTitleTextStyle: {
                color: '#6d95da',
                fontWeight: '300',
                fontSize: 16,
                },
                emptyMonthContainerStyle: {},
                emptyMonthTextStyle: {
                fontWeight: '200',
                },
                weekColumnsContainerStyle: {},
                weekColumnStyle: {
                paddingVertical: 10,
                },
                weekColumnTextStyle: {
                color: '#b6c1cd',
                fontSize: 13,
                },
                nonTouchableDayContainerStyle: {},
                nonTouchableDayTextStyle: {},
                startDateContainerStyle: {},
                endDateContainerStyle: {},
                dayContainerStyle: {},
                dayTextStyle: {
                color: '#2d4150',
                fontWeight: '200',
                fontSize: 15,
                },
                dayOutOfRangeContainerStyle: {},
                dayOutOfRangeTextStyle: {},
                todayContainerStyle: {},
                todayTextStyle: {
                color: '#6d95da',
                },
                activeDayContainerStyle: {
                backgroundColor: '#6d95da',
                },
                activeDayTextStyle: {
                color: 'white',
                },
                nonTouchableLastMonthDayTextStyle: {},
            }}
            />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  title: {
    width: '100%',
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7D3042',
  },
  inputBox: {
    fontSize: 14,
    textAlign: 'left',
    margin: 5,
    color: '#000000b0',
    borderWidth: 1,
    borderColor: '#F9CDD4',
    backgroundColor: '#F9CDD4',
    borderRadius: 5,
    padding: 5,
  },
  viewHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
  calendar: {
      backgroundColor: 'white',
      width: '90%',
  }
});

export default CalendarScreen;
