import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Article} from '../../store/articles/types';
import {loadTags} from '../../store/tags/actions';
import {ArticlesStore} from '../../store';
import {RootStackParams} from '../../navigation/types';

import useStore from './useStore';

const useArticles = () => {
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();

  const {
    user,
    tags,
    error,
    articles,
    isLoading,
    isUpdating,
    isLastPage,
    isRefreshing,
    isTagsLoading,
  } = useStore();

  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const onChipsPress = useCallback(
    (title: string) => {
      const isUnselectTag = selectedTag === title;
      setSelectedTag(isUnselectTag ? undefined : title);
      ArticlesStore.fetchArticles({tag: isUnselectTag ? undefined : title});
    },
    [selectedTag]
  );

  const chipsList = useMemo(
    () =>
      tags.map((title) => ({
        title,
        selected: selectedTag === title,
        onPress: () => onChipsPress(title),
      })),
    [selectedTag, tags, onChipsPress]
  );

  const onArticlePress = useCallback((article: Article) => {
    console.log(article);
  }, []);

  const onLikePress = useCallback(() => {
    if (user) return;

    push('AuthModal');
  }, [push, user]);

  const onAuthorPress = useCallback(
    (article: Article) => {
      push('Profile', {author: article.author});
    },
    [push]
  );

  const articlesList = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        onPress: () => onArticlePress(article),
        onLikePress: () => onLikePress(),
        onAuthorPress: () => onAuthorPress(article),
      })),
    [articles, onArticlePress, onAuthorPress, onLikePress]
  );

  const onLoadArticles = useCallback(() => {
    if (isLastPage) return;
    ArticlesStore.fetchArticles({});
  }, [isLastPage]);

  const onRefreshArticles = useCallback(
    () => ArticlesStore.refreshArticles(),
    []
  );

  useEffect(() => {
    ArticlesStore.fetchArticles({});
    loadTags();
  }, []);

  return {
    error,
    chipsList,
    isLoading,
    isUpdating,
    articlesList,
    isRefreshing,
    isTagsLoading,
    onLoadArticles,
    onRefreshArticles,
    onArticlePress,
  };
};

export default useArticles;
