import {Ionicons} from '@expo/vector-icons';
import {Button} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Card,
  View,
  Text,
  Avatar,
  TouchableOpacity,
  Colors,
} from 'react-native-ui-lib';

import {formatDate} from '../../utils/date';

export const COMMENT_BORDER_RADIUS = 10;
export const AVATAR_SIZE = 24;

export type CommentProps = {
  body: string;
  authorName: string;
  authorImage: string;
  date?: string;
  onAuthorPress?: () => void;
  onRemoveComment?: () => void;
};

const Comment = ({
  body,
  date,
  authorName,
  authorImage,
  onAuthorPress,
  onRemoveComment,
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
      <View row center>
        <Text marginL-s2 grey30 marginR-s4>
          {formatDate(date)}
        </Text>
        {onRemoveComment && (
          <Button onPress={onRemoveComment} variant="ghost">
            <Ionicons name="trash" size={20} color={Colors.blue30} />
          </Button>
        )}
      </View>
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
