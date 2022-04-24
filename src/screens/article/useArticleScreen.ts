import {useEffect, useCallback, useMemo} from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ArticlesStore, CommentsStore} from '../../store';
import {Article, Author} from '../../store/types';
import {RootStackParams} from '../../navigation/types';
import useShowErrorHook from '../../hooks/useShowErrorHook';

import useStore from './useStore';
import {showErrorToast} from '../../utils/toast';
import ErrorMessages from '../../errorMessages';

type UseArticleScreenParams = {
  article: Article;
};

const useArticleScreen = ({article}: UseArticleScreenParams) => {
  const {error, user, comments, isCommentsLoading} = useStore();
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();

  const {error: commentsError} = useShowErrorHook({
    error,
    isEmpty: !!comments.length,
  });

  const isGuest = useMemo(() => !user, [user]);

  const onAuthorPress = useCallback(() => {
    push('Profile', {username: article.author.username});
  }, [article.author, push]);

  const onCommentAuthorPress = useCallback(
    (author: Author) => {
      push('Profile', {username: author.username});
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

  const onLikePress = useCallback(() => {
    if (!user) {
      return push('AuthModal');
    }

    try {
      if (article.favorited) {
        ArticlesStore.unFavorite(article.slug);
      } else {
        ArticlesStore.favorite(article.slug);
      }
    } catch (err) {
      showErrorToast({title: ErrorMessages.default});
    }
  }, [article.favorited, article.slug, push, user]);

  useEffect(() => {
    CommentsStore.loadComments(article.slug);
  }, [article.slug]);

  return {
    isGuest,
    commentsError,
    mappedComments,
    isCommentsLoading,
    onLikePress,
    onAuthorPress,
    openAuthLoginModal,
    openAuthRegisterModal,
    onCommentsErrorPress,
  };
};

export default useArticleScreen;
