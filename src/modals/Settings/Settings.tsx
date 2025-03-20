import React from 'react';
import {ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Box, Button, Spinner} from 'native-base';
import {View, TextField} from 'react-native-ui-lib';
import {SafeAreaView} from 'react-native-safe-area-context';

import useSettings from './useSettings';

const Settings = () => {
  const {
    user,
    isUpdating,
    onImageChange,
    onUserNameChange,
    onBioChange,
    onEmailChange,
    onPasswordChange,
    onUserUpdate,
    onLogoutPress,
  } = useSettings();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View flexG paddingH-s5>
          <TextField
            placeholder="Avatar"
            onChangeText={onImageChange}
            preset={TextField.presets.OUTLINE}
          />
          <TextField
            value={user?.username}
            placeholder="Username"
            onChangeText={onUserNameChange}
            preset={TextField.presets.OUTLINE}
          />
          <TextField
            value={user?.bio}
            numberOfLines={4}
            placeholder="Short bio about you"
            onChangeText={onBioChange}
            preset={TextField.presets.OUTLINE}
          />
          <TextField
            value={user?.email}
            placeholder="Email"
            onChangeText={onEmailChange}
            preset={TextField.presets.OUTLINE}
          />
          <TextField
            placeholder="New Password"
            onChangeText={onPasswordChange}
            preset={TextField.presets.OUTLINE}
          />

          <Button
            colorScheme="success"
            onPress={onUserUpdate}
          >
            {isUpdating ? <Spinner color="white" /> : 'Update Settings'}
          </Button>
        </View>
      </ScrollView>
      <Button
        size="lg"
        borderRadius={0}
        colorScheme="danger"
        onPress={onLogoutPress}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

export default observer(Settings);
