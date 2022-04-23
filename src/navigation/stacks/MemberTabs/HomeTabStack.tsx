import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from 'react-native-ui-lib';

import {ScreenIds, ScreensRegistry} from '../..';
import {LeftAvatarButton} from '../../header';
import {MemberStackParams, MemberStackParamsKeys} from '../../types';

const HomeTabStack = createStackNavigator<MemberStackParams>();

const HomeTabStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const articleScreen = ScreensRegistry[ScreenIds.article];
  const profileScreen = ScreensRegistry[ScreenIds.profile];
  const settingsModal = ScreensRegistry[ScreenIds.settingsModal];

  return (
    <HomeTabStack.Navigator
      screenOptions={{
        headerTintColor: Colors.white,
        headerStyle: {backgroundColor: Colors.blue30},
      }}
    >
      <HomeTabStack.Screen
        name={articlesScreen.name as MemberStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />

      <HomeTabStack.Screen
        name={articleScreen.name as MemberStackParamsKeys}
        component={articleScreen.component}
        options={{
          title: articleScreen.title,
        }}
      />

      <HomeTabStack.Screen
        name={profileScreen.name as MemberStackParamsKeys}
        component={profileScreen.component}
        options={{
          title: profileScreen.title,
        }}
      />

      <HomeTabStack.Group screenOptions={{presentation: 'modal'}}>
        <HomeTabStack.Screen
          name={settingsModal.name as MemberStackParamsKeys}
          component={settingsModal.component}
          options={{
            title: settingsModal.title,
          }}
        />
      </HomeTabStack.Group>
    </HomeTabStack.Navigator>
  );
};

export default HomeTabStackScreen;