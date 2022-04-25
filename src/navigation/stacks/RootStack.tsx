import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {User} from '../../store/types';

import {ScreenIds, ScreensRegistry} from '..';
import {MemberStackParamsKeys} from '../types';

import MemberTabs from './MemberTabs';
import GuestStackScreen from './GuestStack';

const Stack = createStackNavigator();

const RootStackScreen = ({user}: {user?: User}) => {
  const settingsModal = ScreensRegistry[ScreenIds.settingsModal];
  const createArticleModal = ScreensRegistry[ScreenIds.createArticleModal];

  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: route.name.toLowerCase().includes('modal'),
      })}
    >
      {user ? (
        <>
          <Stack.Screen name="MemberStackScreen" component={MemberTabs} />

          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name={createArticleModal.name as MemberStackParamsKeys}
              component={createArticleModal.component}
              options={{
                title: createArticleModal.title,
              }}
            />

            <Stack.Screen
              name={settingsModal.name as MemberStackParamsKeys}
              component={settingsModal.component}
              options={{
                title: settingsModal.title,
              }}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="GuestStackScreen" component={GuestStackScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootStackScreen;
