import React, {useState, useEffect} from 'react';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {tw, color} from 'react-native-tailwindcss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const MyCalendar = props => {
  const [markedDates, setMarkedDate] = useState({});
  const [DateInside, setDateInside] = useState([]);

  function createMarkdate(notes) {
    const markdate = {};
    const dateInside = [];

    notes.forEach(note => {
      let date = new Date(note.date.seconds * 1000);
      console.log('note', note.date);
      console.log(date.getDate());
      let day;
      let month;
      if (date.getDate() < 10) {
        day = '0' + date.getDate();
      } else {
        day = date.getDate();
      }

      if (date.getMonth() + 1 < 10) {
        month = '0' + (date.getMonth() + 1);
      } else {
        month = date.getMonth() + 1;
      }

      markdate[`${date.getFullYear()}-${month}-${day}`] = {
        selected: true,
        selectedColor: 'pink',
        key: notes.date,
      };
      dateInside.push(`${date.getFullYear()}-${month}-${day}`);
    });

    console.log('markdate', markdate);

    setMarkedDate(markdate);
    setDateInside(dateInside);
  }

  useEffect(() => {
    if (props.notes) {
      createMarkdate(props.notes);
    }
  }, [props.notes]);

  return (
    <Calendar
      style={[tw.wFull, tw.bgTransparent, tw.fontBlack]}
      markedDates={markedDates}
      theme={{
        calendarBackground: color.transparent,
        textSectionTitleColor: color.black,
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: color.blue400,
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#B25B6E',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: 'blue',
        indicatorColor: 'blue',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 15,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 15,
      }}
      onDayPress={day => {
        if (DateInside.includes(day.dateString)) {
          console.log(day);
          props.navigation.navigate('Diary', {
            day: day,
            user: props.user,
            key: markedDates[day.dateString].key,
          });
        }
      }}
      onDayLongPress={day => {
        if (DateInside.includes(day.dateString)) {
          console.log(day);
        }
      }}
      onMonthChange={month => {
        console.log('month changed', month);
      }}
      hideExtraDays={true}
      firstDay={1}
      onPressArrowLeft={subtractMonth => subtractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      renderHeader={date => {
        return (
          <Text style={[tw.textLg]}>
            {`${months[date.getMonth()]} ${date.getFullYear()}`}
          </Text>
        );
      }}
      enableSwipeMonths={true}
    />
  );
};

export default MyCalendar;
