import React from 'react';
import {ScrollView} from 'react-native';

import {SkeletonArticleCard} from '../../components';

const SkeletonArticles = () => (
  <ScrollView>
    <SkeletonArticleCard />
  </ScrollView>
);

export default SkeletonArticles;
