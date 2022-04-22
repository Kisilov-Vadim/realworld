import React from 'react';
import {View} from 'react-native-ui-lib';
import {Button} from 'native-base';

import {UserStore} from '../../store';

const Settings = () => (
  <View flexG center>
    <Button onPress={() => UserStore.forgetUser()}>Logout</Button>
  </View>
);

export default Settings;
