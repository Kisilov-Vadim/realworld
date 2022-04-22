import React from 'react';
import {uniqueId, times as lodashTimes} from 'lodash';
import {Divider, Skeleton} from 'native-base';
import {Colors, View} from 'react-native-ui-lib';

import {SkeletonChipsList} from '../chipsList';
import {AVATAR_SIZE} from '../articleAuthor/ArticleAuthor';

type SkeletonArticleCardProps = {
  times?: number;
};

const SkeletonArticleCard = ({times = 1}: SkeletonArticleCardProps) => (
  <>
    {lodashTimes(times, () => (
      <>
        <View padding-s5 key={uniqueId()}>
          <View row centerV spread marginB-s3>
            <View row centerV>
              <Skeleton h={AVATAR_SIZE} w={AVATAR_SIZE} borderRadius={50} />
              <View marginL-s2>
                <Skeleton h={3} w={20} mb={1} />
                <Skeleton h={3} w={20} />
              </View>
            </View>
            <Skeleton h={6} w={12} />
          </View>
          <View>
            <Skeleton h={5} mb={3} />
            <Skeleton h={3} mb={1} />
            <Skeleton h={3} />
          </View>
          <View row marginT-s3>
            <SkeletonChipsList />
          </View>
        </View>
        <Divider color={Colors.grey50} />
      </>
    ))}
  </>
);

export default SkeletonArticleCard;
