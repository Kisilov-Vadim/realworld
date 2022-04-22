import {useCallback, useMemo, useState} from 'react';

import {ArticlesStore} from '../../store';
import useArticlesHook from '../../hooks/useArticlesHook';

import useStore from './useStore';

const useArticles = () => {
  const {tags, isTagsLoading} = useStore();
  const articlesParams = useArticlesHook({predicate: {}, withTags: true});

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

  return {
    ...articlesParams,
    chipsList,
    isTagsLoading,
  };
};

export default useArticles;
