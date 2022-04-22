import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native-ui-lib';

import {ScreenIds, ScreensRegistry} from '..';
import {LeftAvatarButton, RightFollowButton} from '../header';
import {GuestStackParams, GuestStackParamsKeys} from '../types';

const GuestStack = createStackNavigator<GuestStackParams>();

const GuestStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const articleScreen = ScreensRegistry[ScreenIds.article];
  const profileScreen = ScreensRegistry[ScreenIds.profile];
  const authModal = ScreensRegistry[ScreenIds.authModal];

  return (
    <GuestStack.Navigator
      screenOptions={{
        headerTintColor: Colors.white,
        headerStyle: {backgroundColor: Colors.blue30},
        cardStyle: {backgroundColor: Colors.white},
      }}
    >
      <GuestStack.Screen
        name={articlesScreen.name as GuestStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />

      <GuestStack.Screen
        name={articleScreen.name as GuestStackParamsKeys}
        component={articleScreen.component}
        options={{
          title: articleScreen.title,
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
