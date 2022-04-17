import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';
import {observer} from 'mobx-react-lite';
import {RootSiblingParent} from 'react-native-root-siblings';

import {UserStore} from '../../store';

import MemberStackScreen from './MemberStack';
import GuestStackScreen from './GuestStack';

const Stack = createStackNavigator();

const RootStackScreen = observer(() => {
  const user = UserStore.getUser();

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <RootSiblingParent>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? (
              <Stack.Screen
                name="MemberStackScreen"
                component={MemberStackScreen}
              />
            ) : (
              <Stack.Screen
                name="GuestStackScreen"
                component={GuestStackScreen}
              />
            )}
          </Stack.Navigator>
        </RootSiblingParent>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
});

export default RootStackScreen;
