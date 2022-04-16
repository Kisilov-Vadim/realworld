import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider} from 'native-base';

import {ScreenIds, ScreensRegistry} from '..';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <NativeBaseProvider>
    <SafeAreaProvider>
      <RootStack.Navigator>
        <RootStack.Screen
          name={ScreensRegistry[ScreenIds.posts].name}
          component={ScreensRegistry[ScreenIds.posts].component}
          options={{title: '', headerTransparent: true}}
        />
      </RootStack.Navigator>
    </SafeAreaProvider>
  </NativeBaseProvider>
);

export default RootStackScreen;
