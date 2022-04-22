import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ArticlesStore, TagsStore} from '../../store';
import useArticlesHook from '../../hooks/useArticlesHook';

import useStore from './useStore';

const useArticlesScreen = () => {
  const navigation = useNavigation();

  const {tags, isTagsLoading} = useStore();
  const articlesParams = useArticlesHook({predicate: {}, withTags: true});

  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const predicateRef = useRef({});

  const onChipsPress = useCallback(
    (title: string) => {
      const newTag = selectedTag === title ? undefined : title;
      predicateRef.current = newTag ? {tag: newTag} : {};

      setSelectedTag(newTag);
      ArticlesStore.loadArticles(predicateRef.current);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ArticlesStore.loadArticles(predicateRef.current);
    });

    TagsStore.loadTags();

    return unsubscribe;
  }, [navigation]);

  return {
    ...articlesParams,
    chipsList,
    isTagsLoading,
  };
};

export default useArticlesScreen;
