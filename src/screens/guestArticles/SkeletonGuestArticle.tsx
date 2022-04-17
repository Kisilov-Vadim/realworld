import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native-ui-lib';

import {SkeletonArticleCard, SkeletonChipsList} from '../../components';

const SkeletonGuestArticle = () => (
  <SafeAreaView style={{flex: 1}}>
    <ScrollView>
      <View paddingH-s5 paddingV-s3>
        <SkeletonChipsList />
      </View>
      <SkeletonArticleCard times={3} />
    </ScrollView>
  </SafeAreaView>
);

export default SkeletonGuestArticle;
