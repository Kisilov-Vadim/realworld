import React from 'react';
import {View} from 'react-native-ui-lib';

import {ErrorScreen, SkeletonComment, Comment} from '../../../components';
import {CommentProps} from '../../../components/comment/Comment';

type ArticleScreenCommentsProps = {
  comments: (CommentProps & {id: number})[];
  isLoading: boolean;
  error?: string;
  onReloadCommentsPress?: () => void;
};

const ArticleScreenComments = ({
  error,
  comments,
  isLoading,
  onReloadCommentsPress,
}: ArticleScreenCommentsProps) => {
  if (error)
    return (
      <View paddingV-s5>
        <ErrorScreen onPress={onReloadCommentsPress} message={error} />
      </View>
    );

  return (
    <View padding-s5>
      {isLoading ? (
        <SkeletonComment times={2} />
      ) : (
        <View>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              body={comment.body}
              authorName={comment.authorName}
              authorImage={comment.authorImage}
              date={comment.date}
              onAuthorPress={comment.onAuthorPress}
              onRemoveComment={comment.onRemoveComment}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ArticleScreenComments;
