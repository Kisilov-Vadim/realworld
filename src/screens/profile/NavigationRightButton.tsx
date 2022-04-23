import React from 'react';
import {Button} from 'native-base';
import {View, Text} from 'react-native-ui-lib';

type NavigationRightButtonProps = {
  onPress: () => void;
  isFollowed: boolean;
};

const NavigationRightButton = ({
  isFollowed,
  onPress,
}: NavigationRightButtonProps) => (
  <View paddingH-s2>
    <Button onPress={onPress} variant="link">
      <Text white text70BO>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Text>
    </Button>
  </View>
);

export default NavigationRightButton;
