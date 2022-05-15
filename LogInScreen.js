import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  Image,
  // ImageBackground,
} from 'react-native';

import LogIn from './components/LogIn';

const LogInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogIn = () => {
    if (username == 'Earn' && password == 'test') {
      Alert.alert('Log-In Sucessfully!');
      navigation.navigate('Main', {user: username});
    } else {
      Alert.alert('Failed to Log-In!');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <LogIn
          onLogIn={doLogIn}
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
    // height: '100%',
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
    // position: 'absolute',
  },
});

export default LogInScreen;
