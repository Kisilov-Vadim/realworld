import React from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';

import {SkeletonArticleCard, SkeletonChipsList} from '../../components';

const SkeletonArticles = () => (
  <ScrollView>
    <View paddingH-s5 paddingV-s3>
      <SkeletonChipsList />
    </View>
    <SkeletonArticleCard times={3} />
  </ScrollView>
);

export default SkeletonArticles;
