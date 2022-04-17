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
  const memberArticles = ScreensRegistry[ScreenIds.memberArticles];
  const personalArticles = ScreensRegistry[ScreenIds.personalArticles];

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerLeft: LeftAvatarButton,
      }}
    >
      <Tab.Screen
        name={memberArticles.name}
        component={memberArticles.component}
        options={{
          title: memberArticles.title,
          tabBarIcon: HomeTabBarIcon,
        }}
      />

      <Tab.Screen
        name={personalArticles.name}
        component={personalArticles.component}
        options={{
          title: personalArticles.title,
          tabBarIcon: PersonalTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default MemberStackScreen;
