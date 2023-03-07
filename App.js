import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput,Button, Alert, ScrollView } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react native gesture handler
import 'react-native-gesture-handler';
const firebase = require('firebase');
require('firebase/firestore');

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

export default class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = { text: '' };
 }

 alertMyText(input=[]){
  Alert.alert(input.text);
 }

 render() {
  // Create the navigator

  return (
    <NavigationContainer>
         {/* <Tab.Navigator
        initialRouteName="Screen1"
      >
        <Tab.Screen
          name="Screen1"
          component={Screen1}
        />
        <Tab.Screen
          name="Screen2"
          component={Screen2}
        />
      </Tab.Navigator> */}
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });