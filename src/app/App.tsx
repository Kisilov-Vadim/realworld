import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react-lite';
import {NativeBaseProvider, Spinner} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';

import {RootStackScreen} from '../navigation';
import {UserStore} from '../store';

const App = () => {
  const {user, isLoading} = UserStore;

  useEffect(() => {
    UserStore.loadFromStorage();
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <RootSiblingParent>
          {isLoading ? (
            <View flexG center>
              <Spinner color={Colors.blue30} size="lg" />
            </View>
          ) : (
            <NavigationContainer>
              <RootStackScreen user={user} />
            </NavigationContainer>
          )}
        </RootSiblingParent>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
};

export default observer(App);
