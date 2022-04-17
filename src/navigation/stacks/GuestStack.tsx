import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {LeftAvatarButton} from '../header';
import {ScreenIds, ScreensRegistry, ScreenTitles} from '..';

const GuestStack = createStackNavigator();

const GuestStackScreen = () => (
  <GuestStack.Navigator>
    <GuestStack.Screen
      name={ScreensRegistry[ScreenIds.guestArticles].name}
      component={ScreensRegistry[ScreenIds.guestArticles].component}
      options={{
        title: ScreenTitles.guestArticles,
        headerLeft: LeftAvatarButton,
      }}
    />

    <GuestStack.Group screenOptions={{presentation: 'modal'}}>
      <GuestStack.Screen
        name={ScreensRegistry[ScreenIds.authModal].name}
        component={ScreensRegistry[ScreenIds.authModal].component}
        options={{
          title: ScreenTitles.authModal,
        }}
      />
    </GuestStack.Group>
  </GuestStack.Navigator>
);

export default GuestStackScreen;
