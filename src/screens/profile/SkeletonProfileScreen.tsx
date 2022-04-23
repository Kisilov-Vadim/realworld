import React from 'react';
import {Skeleton} from 'native-base';
import {View} from 'react-native-ui-lib';

import {SkeletonArticles} from '../../components';

const SkeletonProfileScreen = () => (
  <View>
    <View center padding-s6 bg-blue80>
      <Skeleton size="65" rounded="full" />
      <View marginT-s2>
        <Skeleton h={5} w={40} />
      </View>
    </View>
    <View>
      <SkeletonArticles />
    </View>
  </View>
);

export default SkeletonProfileScreen;
