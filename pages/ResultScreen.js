import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import NoteList from '../components/NoteList';

const ResultScreen = ({navigation, route}) => {
  let username = route.params.user;

  const onAddData = () => {
    navigation.navigate('Main', {user: username});
  };

  const onCalendar = () => {
    navigation.navigate('Calendar', {user: username});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Period Tracker</Text>
      <NoteList onAddData={onAddData} onCalendar={onCalendar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    padding: 15,
    paddingBottom: 180,
    height: '100%',
  },
  title: {
    width: '100%',
    margin: 10,
    marginTop: 20,
    marginLeft: 10,
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
    marginTop: 20,
    marginBottom: 60,
  },
});

export default ResultScreen;
