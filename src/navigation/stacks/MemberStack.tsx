import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native-ui-lib';

import {LeftAvatarButton} from '../header';

const Tab = createBottomTabNavigator();

const Profile = () => (
  <View flex center>
    <Text>Profile</Text>
  </View>
);

const Settings = () => (
  <View flex center>
    <Text>Settings</Text>
  </View>
);

const MemberStackScreen = () => (
  <Tab.Navigator screenOptions={{headerLeft: LeftAvatarButton}}>
    <Tab.Screen name="Profile" component={Profile} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);

export default MemberStackScreen;
