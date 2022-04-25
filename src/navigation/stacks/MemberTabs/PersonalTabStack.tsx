import * as React from 'react';
import {Colors} from 'react-native-ui-lib';
import {createStackNavigator} from '@react-navigation/stack';

import {LeftAvatarButton} from '../../header';
import {ScreenIds, ScreensRegistry} from '../..';
import {MemberStackParams, MemberStackParamsKeys} from '../../types';
import RightCreateArticleButton from '../../header/RightCreateArticleButton';

const PersonalTabStack = createStackNavigator<MemberStackParams>();

const PersonalTabStackScreen = () => {
  const articleScreen = ScreensRegistry[ScreenIds.article];
  const profileScreen = ScreensRegistry[ScreenIds.profile];
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const userArticlesScreen = ScreensRegistry[ScreenIds.userArticles];

  return (
    <PersonalTabStack.Navigator
      screenOptions={{
        headerTintColor: Colors.white,
        headerStyle: {backgroundColor: Colors.blue30},
        cardStyle: {backgroundColor: Colors.white},
      }}
    >
      <PersonalTabStack.Screen
        name={userArticlesScreen.name as MemberStackParamsKeys}
        component={userArticlesScreen.component}
        options={{
          title: userArticlesScreen.title,
          headerLeft: LeftAvatarButton,
          headerRight: RightCreateArticleButton,
        }}
      />

      <PersonalTabStack.Screen
        name={articlesScreen.name as MemberStackParamsKeys}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          headerLeft: LeftAvatarButton,
        }}
      />

      <PersonalTabStack.Screen
        name={articleScreen.name as MemberStackParamsKeys}
        component={articleScreen.component}
        options={{
          title: articleScreen.title,
        }}
      />

      <PersonalTabStack.Screen
        name={profileScreen.name as MemberStackParamsKeys}
        component={profileScreen.component}
        options={{
          title: profileScreen.title,
        }}
      />
    </PersonalTabStack.Navigator>
  );
};

export default PersonalTabStackScreen;
