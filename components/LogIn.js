import React from 'react';
import {Button, StyleSheet, View, Text, TextInput, Image} from 'react-native';

const LogIn = props => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/drop_icon.png')} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.headerTxt}>Email</Text>
        <TextInput
          style={styles.inputBox}
          autoCapitalize="none"
          onChangeText={value => props.onUsernameChanged(value)}
        />
        <Text style={styles.headerTxt}>Password</Text>
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          onChangeText={value => props.onPasswordChanged(value)}
        />
        <View style={styles.viewHorizontal}>
          <Button title="Sign in" onPress={props.onLogIn} color="#B25B6E" />
          <Button title="Sign up" onPress={props.onSignUp} color="#B25B6E" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  icon: {
    margin: 40,
    marginTop: 40,
  },
  content: {
    width: '80%',
    padding: 5,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderWidth: 20,
    borderRadius: 5,
    borderColor: 'white',
  },
  headerTxt: {
    fontSize: 14,
    margin: 5,
    color: '#000000',
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
});

export default LogIn;
