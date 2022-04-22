import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {MemberStackParams, MemberStackParamsKeys} from '../../types';
import {LeftAvatarButton} from '../../header';

import {ScreenIds, ScreensRegistry} from '../..';

const PersonalTabStack = createStackNavigator<MemberStackParams>();

const PersonalTabStackScreen = () => {
  const userArticlesScreen = ScreensRegistry[ScreenIds.userArticles];

  return (
    <PersonalTabStack.Navigator>
      <PersonalTabStack.Screen
        name={userArticlesScreen.name as MemberStackParamsKeys}
        component={userArticlesScreen.component}
        options={{
          title: userArticlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />
    </PersonalTabStack.Navigator>
  );
};

export default PersonalTabStackScreen;
