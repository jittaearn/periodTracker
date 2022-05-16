import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Alert} from 'react-native';

import LogIn from '../components/LogIn';
import firestore from '@react-native-firebase/firestore';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const LogInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('user')
      .where('user', '==', username)
      .onSnapshot(querySnapshot => {
        const user = [];

        querySnapshot.forEach(documentSnapshot => {
          if (
            documentSnapshot.get('username') == username &&
            documentSnapshot.get('password') == password
          ) {
            doLogIn(documentSnapshot.get('username'));
          } else {
            Alert.alert('Failed to Log-In!');
          }
        });

        setUsers(user);
        setLoading(false);
      });
    return () => subscriber();
  });

  const onSignUp = () => {
    firestore()
      .collection('user')
      .add({
        username: username,
        password: password,
        hasPeriod: false,
      })
      .then(() => {
        Alert.alert('Sign-Up Successfully! Please login again!');
      });
  };

  const doLogIn = () => {
    Alert.alert('Log-In Successfully!');
    navigation.navigate('Main', {user: username});
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <LogIn
          onLogIn={doLogIn}
          onSignUp={onSignUp}
          onUsernameChanged={uname => setUsername(uname)}
          onPasswordChanged={pwd => setPassword(pwd)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    backgroundColor: 'pink',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logInBg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 50,
    height: '40%',
  },
});

export default LogInScreen;
