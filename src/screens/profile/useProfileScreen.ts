import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ArticlesStore} from '../../store';
import {Author} from '../../store/types';
import useArticlesHook from '../../hooks/useArticlesHook';

type UseProfileScreenParams = {
  author: Author;
};

const useProfileScreen = ({author}: UseProfileScreenParams) => {
  const navigation = useNavigation();

  const articlesProps = useArticlesHook({
    isProfile: true,
    predicate: {author: author.username},
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ArticlesStore.loadArticles({author: author.username});
    });

    return unsubscribe;
  }, []);

  return {
    ...articlesProps,
  };
};

export default useProfileScreen;
