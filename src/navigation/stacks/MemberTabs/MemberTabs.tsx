import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import HomeTabStack from './HomeTabStack';
import PersonalTabStack from './PersonalTabStack';

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

const MemberTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen
      name="HomeTabStackScreen"
      component={HomeTabStack}
      options={{headerShown: false, tabBarIcon: HomeTabBarIcon}}
    />

    <Tab.Screen
      name="PersonalTabStackScreen"
      component={PersonalTabStack}
      options={{headerShown: false, tabBarIcon: PersonalTabBarIcon}}
    />
  </Tab.Navigator>
);

export default MemberTabs;
