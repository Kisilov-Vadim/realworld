import React from 'react';
import {Skeleton} from 'native-base';
import {View} from 'react-native-ui-lib';

const SkeletonChipsList = () => (
  <View row>
    <Skeleton h={8} w={20} mr={3} borderRadius={50} />
    <Skeleton h={8} w={20} mr={3} borderRadius={50} />
    <Skeleton h={8} w={20} mr={3} borderRadius={50} />
  </View>
);

export default SkeletonChipsList;
