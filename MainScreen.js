import React from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';

import AddData from './components/AddData';

const MainScreen = ({navigation, route}) => {
  let user = route.params.user;

  const doSignOut = () => {
    navigation.navigate('LogIn');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Period Tracker</Text>
      <AddData user={user} onSignOut={doSignOut} navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
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
});

export default MainScreen;
