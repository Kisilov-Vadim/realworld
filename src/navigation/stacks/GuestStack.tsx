import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LeftAvatarButton} from '../header';
import {ScreenIds, ScreensRegistry} from '..';

const GuestStack = createStackNavigator();

const GuestStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const authModal = ScreensRegistry[ScreenIds.authModal];

  return (
    <GuestStack.Navigator>
      <GuestStack.Screen
        name={articlesScreen.name}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />

      <GuestStack.Group screenOptions={{presentation: 'modal'}}>
        <GuestStack.Screen
          name={authModal.name}
          component={authModal.component}
          options={{
            title: authModal.title,
          }}
        />
      </GuestStack.Group>
    </GuestStack.Navigator>
  );
};

export default GuestStackScreen;
