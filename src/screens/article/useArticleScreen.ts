import {useEffect, useCallback, useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {CommentsStore} from '../../store';
import {Article, Author} from '../../store/types';
import {RootStackParams} from '../../navigation/types';
import useShowErrorHook from '../../hooks/useShowErrorHook';

import useStore from './useStore';

type UseArticleScreenParams = {
  article: Article;
};

const useArticleScreen = ({article}: UseArticleScreenParams) => {
  const {error, user, comments, isCommentsLoading} = useStore();
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();

  const {showErrorScreen: showCommentsErrorScreen} = useShowErrorHook({
    error,
    isEmpty: !!comments.length,
  });

  const isGuest = useMemo(() => !user, [user]);

  const commentsError = useMemo(
    () => (showCommentsErrorScreen ? error : undefined),
    [error, showCommentsErrorScreen]
  );

  const onAuthorPress = useCallback(() => {
    push('Profile', {author: article.author});
  }, [article.author, push]);

  const onCommentAuthorPress = useCallback(
    (author: Author) => {
      push('Profile', {author});
    },
    [push]
  );

  const openAuthLoginModal = useCallback(() => {
    push('AuthModal');
  }, [push]);

  const openAuthRegisterModal = useCallback(() => {
    push('AuthModal', {isRegister: true});
  }, [push]);

  const mappedComments = useMemo(
    () =>
      comments.map(({id, body, createdAt, author}) => ({
        id,
        body,
        date: createdAt,
        authorName: author.username,
        authorImage: author.image,
        onAuthorPress: () => onCommentAuthorPress(author),
      })),
    [comments, onCommentAuthorPress]
  );

  const onCommentsErrorPress = useCallback(() => {
    CommentsStore.loadComments(article.slug);
  }, [article.slug]);

  const onFavoritePress = useCallback(() => {
    // todo add functionality
    if (user) return;

    push('AuthModal');
  }, [push, user]);

  const onFollowPress = useCallback(() => {
    // todo add functionality
    if (user) return;

    push('AuthModal');
  }, [push, user]);

  useEffect(() => {
    CommentsStore.loadComments(article.slug);
  }, [article.slug]);

  return {
    isGuest,
    commentsError,
    mappedComments,
    isCommentsLoading,
    onAuthorPress,
    onFollowPress,
    onFavoritePress,
    openAuthLoginModal,
    openAuthRegisterModal,
    onCommentsErrorPress,
  };
};

export default useArticleScreen;
