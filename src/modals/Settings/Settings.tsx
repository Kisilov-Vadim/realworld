import React from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {observer} from 'mobx-react-lite';
import {Box, Button, Input, Spinner, TextArea} from 'native-base';

import {UserStore} from '../../store';

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
  } = useSettings();

  return (
    <View flexG>
      <View flexG paddingH-s5 paddingT-s10>
        <ScrollView>
          <Box alignItems="center">
            <Input
              mb={4}
              size="lg"
              value={user?.image}
              placeholder="Avatar"
              disabled={isUpdating}
              onChangeText={onImageChange}
            />
            <Input
              mb={4}
              size="lg"
              disabled={isUpdating}
              value={user?.username}
              placeholder="Username"
              onChangeText={onUserNameChange}
            />
            <TextArea
              mb={4}
              size="lg"
              value={user?.bio}
              numberOfLines={4}
              isDisabled={isUpdating}
              placeholder="Short bio about you"
              onChangeText={onBioChange}
            />
            <Input
              mb={4}
              size="lg"
              value={user?.email}
              disabled={isUpdating}
              placeholder="Email"
              onChangeText={onEmailChange}
            />
            <Input
              mb={4}
              size="lg"
              disabled={isUpdating}
              placeholder="New Password"
              onChangeText={onPasswordChange}
            />

            <Button
              colorScheme="success"
              disabled={isUpdating}
              onPress={onUserUpdate}
            >
              {isUpdating ? <Spinner color="white" /> : 'Update Settings'}
            </Button>
          </Box>
        </ScrollView>
      </View>
      <Button
        size="lg"
        borderRadius={0}
        colorScheme="danger"
        onPress={() => UserStore.forgetUser()}
      >
        Logout
      </Button>
    </View>
  );
};

export default observer(Settings);
