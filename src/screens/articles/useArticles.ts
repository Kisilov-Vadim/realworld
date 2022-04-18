import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {loadArticles, refreshArticles} from '../../store/articles/actions';
import {Article} from '../../store/articles/types';
import {loadTags} from '../../store/tags/actions';

import useStore from './useStore';
import {ScreenIds} from '../../navigation';

const useArticles = () => {
  // todo add type
  const {push} = useNavigation();

  const {
    isLoading,
    isRefreshing,
    isUpdating,
    articles,
    tags,
    isTagsLoading,
    error,
    user,
  } = useStore();

  const [selectedTag, setSelectedTag] = useState<string | undefined>();

  const chipsList = useMemo(
    () =>
      tags.map((title) => ({
        title,
        selected: selectedTag === title,
        onPress: () => {
          setSelectedTag(title === selectedTag ? undefined : title);
        },
      })),
    [selectedTag, tags]
  );

  const onArticlePress = useCallback((article: Article) => {
    console.log(article);
  }, []);

  const onLikePress = useCallback(() => {
    if (user) return;

    push(ScreenIds.authModal);
  }, [push, user]);

  const mappedArticles = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        onPress: () => onArticlePress(article),
        onLikePress: () => onLikePress(),
      })),
    [articles, onArticlePress, onLikePress]
  );

  const filteredArticles = useMemo(
    () =>
      mappedArticles.filter(({tagList}) =>
        selectedTag ? tagList.includes(selectedTag) : true
      ),
    [mappedArticles, selectedTag]
  );

  const onLoadArticles = useCallback(() => {
    loadArticles();
  }, []);

  const onRefreshArticles = useCallback(() => refreshArticles(), []);

  useEffect(() => {
    loadArticles();
    loadTags();
  }, []);

  return {
    isLoading,
    isRefreshing,
    isUpdating,
    isTagsLoading,
    error,
    chipsList,
    filteredArticles,
    onLoadArticles,
    onRefreshArticles,
    onArticlePress,
    onLikePress,
  };
};

export default useArticles;
