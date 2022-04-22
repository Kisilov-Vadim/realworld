import React from 'react';
import {StyleSheet} from 'react-native';
import {times as lodashTimes, uniqueId} from 'lodash';
import {Card, View} from 'react-native-ui-lib';
import {Skeleton} from 'native-base';
import {COMMENT_BORDER_RADIUS} from './Comment';

type SkeletonCommentProps = {
  times?: number;
};

const SkeletonComment = ({times = 1}: SkeletonCommentProps) => (
  <>
    {lodashTimes(times, () => (
      <Card marginB-s4 key={uniqueId()}>
        <View padding-s5>
          <Skeleton />
        </View>
        <View
          row
          centerV
          spread
          bg-blue70
          paddingH-s5
          paddingV-s2
          style={styles.comment}
        >
          <View row centerV>
            <Skeleton h={7} w={7} borderRadius={50} />
            <View marginL-s2>
              <Skeleton w={20} h={5} />
            </View>
          </View>
          <Skeleton h={5} w={20} />
        </View>
      </Card>
    ))}
  </>
);

const styles = StyleSheet.create({
  comment: {
    borderBottomLeftRadius: COMMENT_BORDER_RADIUS,
    borderBottomRightRadius: COMMENT_BORDER_RADIUS,
  },
});

export default SkeletonComment;
