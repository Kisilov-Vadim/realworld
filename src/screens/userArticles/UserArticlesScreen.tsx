import React from 'react';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react-lite';

const UserArticlesScreen = () => (
  <View flex center>
    <Text>User Articles Screen</Text>
  </View>
);

export default observer(UserArticlesScreen);
