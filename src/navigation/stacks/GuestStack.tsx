import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {ScreenIds, ScreensRegistry} from '..';
import {LeftAvatarButton, RightFollowButton} from '../header';
import {GuestStackParams, GuestStackParamsKeys} from '../types';

const GuestStack = createStackNavigator<GuestStackParams>();

const GuestStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const profileScreen = ScreensRegistry[ScreenIds.profile];
  const authModal = ScreensRegistry[ScreenIds.authModal];

  return (
    <GuestStack.Navigator>
      <GuestStack.Screen
        name={articlesScreen.name as GuestStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />

      <GuestStack.Screen
        name={profileScreen.name as GuestStackParamsKeys}
        component={profileScreen.component}
        options={{
          title: profileScreen.title,
          headerRight: RightFollowButton,
        }}
      />

      <GuestStack.Group screenOptions={{presentation: 'modal'}}>
        <GuestStack.Screen
          name={authModal.name as GuestStackParamsKeys}
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
