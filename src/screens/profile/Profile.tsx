import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Avatar} from 'react-native-ui-lib';

import {GuestStackParams} from '../../navigation/types';

type ProfileProps = StackScreenProps<GuestStackParams, 'Profile'>;

const Profile = ({route}: ProfileProps) => {
  const {author} = route.params;

  return (
    <View center padding-s5 bg-white>
      <Avatar
        useAutoColors
        size={50}
        source={{uri: author.image}}
        name={author.username}
        label={author.username}
      />
      <Text marginT-s2 text60 blue30>
        {author.username}
      </Text>
    </View>
  );
};

export default Profile;
