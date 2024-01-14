import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../login/screens/SignupScreen';
import LoginScreen from '../login/screens/LoginScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {IconButton} from 'react-native-paper';
import HomeScreen from '../login/screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import MainPage from '../login/screens/MainPage';
import TimeCalculateScreen from '../login/screens/TimeCalculateScreen';
import { useNavigation } from "@react-navigation/native";
import DateCalculateScreen from "../login/screens/DateCalculateScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerStyle: {
            backgroundColor: '#48b687',
          },
          title: 'ÖZBELSAN MESAİ İŞLEMLERİ',
          headerTintColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#f4edf9',
          },
          title: 'Ocak Envanteri',
          headerTintColor: '#000000',
          headerRight: () => (
            <IconButton
              icon="logout"
              iconColor={'#FFFFFF'}
              containerColor={'#6b4fa8'}
              mode={'contained'}
              size={20}
              onPress={async () => {
                try {
                  await auth().signOut();
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor={'#6b4fa8'}
              containerColor={'#ffffff'}
              mode={'outlined'}
              size={20}
              onPress={() => {
                navigation.navigate('MainPage');
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="TimeCalculate"
        component={TimeCalculateScreen}
        options={{
          headerStyle: {
            backgroundColor: '#48b687',
          },
          title: 'Mesai Saati Hesaplama',
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor={'#48b687'}
              containerColor={'#ffffff'}
              mode={'outlined'}
              size={20}
              onPress={() => {
                navigation.navigate('MainPage');
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DateCalculateScreen"
        component={DateCalculateScreen}
        options={{
          headerStyle: {
            backgroundColor: '#48b687',
          },
          title: 'Mesai Başlangıç Tarihi',
          headerTintColor: '#FFFFFF',
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor={'#48b687'}
              containerColor={'#ffffff'}
              mode={'outlined'}
              size={20}
              onPress={() => {
                navigation.navigate('MainPage');
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={({navigation}) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
          },
          headerLeft: () => (
            <IconButton
              icon="arrow-left"
              iconColor={'#6b4fa8'}
              containerColor={'#ffffff'}
              mode={'outlined'}
              size={25}
              onPress={() => navigation.navigate('Login')}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
