import React from 'react';
import {ScrollView} from 'react-native';

import {SkeletonArticleCard} from '..';

const SkeletonArticles = () => (
  <ScrollView>
    <SkeletonArticleCard times={2} />
  </ScrollView>
);

export default SkeletonArticles;
