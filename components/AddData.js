import React, {useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CustomCheckBox from './CustomCheckBox';

import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';

const AddData = props => {
  const [isSelected, setSelection] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [note, setNote] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  const addNote = () => {
    firestore()
      .collection('periodTracker')
      .add({
        user: props.user,
        status: status,
        mood: selectedMood,
        date: Date(),
      })
      .then(() => {
        Alert.alert('Note Added!!');
        const popAction = StackActions.pop(1);
        props.navigation.dispatch(popAction);
        props.navigation.navigate('Result');
      });
  };

  const moods = [
    'Calm',
    'Happy',
    'Energetic',
    'Mood swings',
    'Irritated',
    'Sad',
    'Depressed',
    'Feeling Guilty',
    'Confused',
    'Apathetic',
    'Anxious',
    'Frisky',
  ];

  const onPress = mood => {
    setSelectedMood(mood);
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewHorizontal}>
        <Text style={styles.title}>Hello, {props.user}!</Text>
        <Button title="Sign out" onPress={props.onSignOut} color="#B25B6E" />
      </View>
      <View style={styles.checkboxContainer}>
        <CustomCheckBox />
      </View>
      <Text style={styles.label}>Mood</Text>
      <View style={styles.viewMoods}>
        {moods.map(mood => (
          <TouchableOpacity
            style={styles.moodButton}
            onPress={() => onPress(mood)}>
            <Text style={styles.text}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.areaBox}
        multiline={true}
        numberOfLines={4}
        onChangeText={value => setNote(value)}
      />
      <Button title="Submit" onPress={() => addNote()} color="#B25B6E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderWidth: 20,
    borderRadius: 5,
    borderColor: 'white',
  },
  title: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E2758A',
    display: 'flex',
    paddingLeft: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: 'auto',
  },
  checkbox: {
    alignSelf: 'center',
    borderRadius: 5,
    width: 20,
    height: 20,
  },
  label: {
    margin: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000b0',
    marginRight: 'auto',
  },
  viewHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    gap: 30,
  },
  viewMoods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginRight: 10,
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#F9CDD4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  areaBox: {
    fontSize: 14,
    textAlign: 'left',
    margin: 5,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F9CDD4',
    backgroundColor: '#F9CDD4',
    borderRadius: 8,
    width: '95%',
    padding: 10,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000b0',
  },
});

export default AddData;
