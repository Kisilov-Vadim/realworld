import * as React from 'react';
import {Colors} from 'react-native-ui-lib';
import {createStackNavigator} from '@react-navigation/stack';

import {LeftAvatarButton} from '../../header';
import {ScreenIds, ScreensRegistry} from '../..';
import {MemberStackParams, MemberStackParamsKeys} from '../../types';
import RightCreateArticleButton from '../../header/RightCreateArticleButton';

const HomeTabStack = createStackNavigator<MemberStackParams>();

const HomeTabStackScreen = () => {
  const articleScreen = ScreensRegistry[ScreenIds.article];
  const profileScreen = ScreensRegistry[ScreenIds.profile];
  const articlesScreen = ScreensRegistry[ScreenIds.articles];

  return (
    <HomeTabStack.Navigator
      screenOptions={{
        headerTintColor: Colors.white,
        headerStyle: {backgroundColor: Colors.blue30},
        cardStyle: {backgroundColor: Colors.white},
      }}
    >
      <HomeTabStack.Screen
        name={articlesScreen.name as MemberStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
          headerRight: RightCreateArticleButton,
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
    </HomeTabStack.Navigator>
  );
};

export default HomeTabStackScreen;
