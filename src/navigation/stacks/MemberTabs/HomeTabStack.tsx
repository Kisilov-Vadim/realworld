import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MemberStackParams, MemberStackParamsKeys} from '../../types';
import {LeftAvatarButton} from '../../header';

import {ScreenIds, ScreensRegistry} from '../..';

const HomeTabStack = createStackNavigator<MemberStackParams>();

const HomeTabStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const settingsModal = ScreensRegistry[ScreenIds.settingsModal];

  return (
    <HomeTabStack.Navigator>
      <HomeTabStack.Screen
        name={articlesScreen.name as MemberStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
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
