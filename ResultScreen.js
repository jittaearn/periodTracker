import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

import NoteList from './components/NoteList';

const ResultScreen = ({navigation, route}) => {
  // let username = route.params.user;

  const onAddData = () => {
    navigation.navigate('Main');
  };

  const onCalendar = () => {
    navigation.navigate('Calendar');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Period Tracker</Text>
        <NoteList onAddData={onAddData} onCalendar={onCalendar} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    padding: 15,
    paddingBottom: 500,
  },
  container: {
    paddingBottom: 100,
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
