import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {User} from '../../store/types';

import MemberTabs from './MemberTabs';
import GuestStackScreen from './GuestStack';

const Stack = createStackNavigator();

const RootStackScreen = ({user}: {user?: User}) => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {user ? (
      <Stack.Screen name="MemberStackScreen" component={MemberTabs} />
    ) : (
      <Stack.Screen name="GuestStackScreen" component={GuestStackScreen} />
    )}
  </Stack.Navigator>
);

export default RootStackScreen;
