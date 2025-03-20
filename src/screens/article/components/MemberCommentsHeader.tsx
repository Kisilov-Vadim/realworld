import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Spinner, TextArea} from 'native-base';
import {observer} from 'mobx-react-lite';
import {Avatar, Card, View} from 'react-native-ui-lib';

import {CommentsStore, UserStore} from '../../../store';
import {showErrorToast} from '../../../utils/toast';
import ErrorMessages from '../../../errorMessages';

export const COMMENT_BORDER_RADIUS = 10;
export const AVATAR_SIZE = 24;

const MemberCommentsHeader = () => {
  const {user} = UserStore;

  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');

  const onCommentSend = useCallback(async () => {
    setIsLoading(true);
    try {
      CommentsStore.createComment(comment);
      setComment('');
    } catch (err) {
      showErrorToast({title: ErrorMessages.createComment});
    } finally {
      setIsLoading(false);
    }
  }, [comment]);

  return (
    <Card marginB-s4>
      <View padding-s5>
        <TextArea
          value={comment}
          onChangeText={setComment}
          isDisabled={isLoading}
          autoCompleteType={undefined}
          placeholder="Leave your comment"
        />
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
        <Avatar
          useAutoColors
          source={{uri: user?.image}}
          name={user?.username}
          label={user?.username}
          size={AVATAR_SIZE}
        />
        <Button
          size="sm"
          colorScheme="success"
          onPress={onCommentSend}
          disabled={isLoading || !comment}
        >
          {isLoading ? <Spinner color="white" /> : 'Post Comment'}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  comment: {
    borderBottomLeftRadius: COMMENT_BORDER_RADIUS,
    borderBottomRightRadius: COMMENT_BORDER_RADIUS,
  },
});

export default observer(MemberCommentsHeader);
