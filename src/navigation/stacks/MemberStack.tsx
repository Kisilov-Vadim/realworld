import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import {LeftAvatarButton} from '../header';
import {ScreenIds, ScreensRegistry} from '..';

type TabBarIcon = {
  focused: boolean;
  color: string;
  size: number;
};

const HomeTabBarIcon = ({focused, color, size}: TabBarIcon) => {
  if (focused) return <Ionicons name="ios-home" size={size} color={color} />;

  return <Ionicons name="ios-home-outline" size={size} color={color} />;
};

const PersonalTabBarIcon = ({focused, color, size}: TabBarIcon) => {
  if (focused)
    return <MaterialIcons name="favorite" size={size} color={color} />;

  return <MaterialIcons name="favorite-outline" size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const MemberStackScreen = () => {
  const articlesScreen = ScreensRegistry[ScreenIds.articles];
  const userArticlesScreen = ScreensRegistry[ScreenIds.userArticles];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: LeftAvatarButton,
      }}
    >
      <Tab.Screen
        name={articlesScreen.name}
        component={articlesScreen.component}
        options={{
          title: articlesScreen.title,
          tabBarIcon: HomeTabBarIcon,
        }}
      />

      <Tab.Screen
        name={userArticlesScreen.name}
        component={userArticlesScreen.component}
        options={{
          title: userArticlesScreen.title,
          tabBarIcon: PersonalTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MemberStackScreen;
