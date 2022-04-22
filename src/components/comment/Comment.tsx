import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, View, Text, Avatar, TouchableOpacity} from 'react-native-ui-lib';

import {formatDate} from '../../utils/date';

export const COMMENT_BORDER_RADIUS = 10;
export const AVATAR_SIZE = 24;

export type CommentProps = {
  body: string;
  authorName: string;
  authorImage: string;
  date?: string;
  onAuthorPress?: () => void;
};

const Comment = ({
  body,
  date,
  authorName,
  authorImage,
  onAuthorPress,
}: CommentProps) => (
  <Card marginB-s4>
    <View padding-s5>
      <Text>{body}</Text>
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
      <TouchableOpacity
        row
        centerV
        onPress={onAuthorPress}
        disabled={!onAuthorPress}
      >
        <Avatar
          useAutoColors
          source={{uri: authorImage}}
          name={authorName}
          label={authorName}
          size={AVATAR_SIZE}
        />
        <Text marginL-s2 blue30>
          {authorName}
        </Text>
      </TouchableOpacity>
      <Text marginL-s2 grey30>
        {formatDate(date)}
      </Text>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  comment: {
    borderBottomLeftRadius: COMMENT_BORDER_RADIUS,
    borderBottomRightRadius: COMMENT_BORDER_RADIUS,
  },
});

export default Comment;
