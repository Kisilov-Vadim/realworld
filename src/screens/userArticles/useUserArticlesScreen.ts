import {useState, useEffect, useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ArticlesStore} from '../../store';
import {Predicate} from '../../store/Articles';
import useArticlesHook from '../../hooks/useArticlesHook';

import useStore from './useStore';

enum Tabs {
  favorited,
  myFeed,
  myArticles,
}

const useUserArticlesScreen = () => {
  const navigation = useNavigation();

  const {user} = useStore();

  // eslint-disable-next-line react/hook-use-state
  const [tabItems] = useState([
    {label: 'Favorited'},
    {label: 'My Feed'},
    {label: 'My Articles'},
  ]);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    Tabs.favorited
  );

  const [predicate, setPredicate] = useState<Predicate>({
    favoritedBy: user?.username,
  });

  const articlesProps = useArticlesHook({
    predicate,
  });

  const articles = useMemo(() => {
    if (selectedTabIndex === Tabs.favorited) {
      return articlesProps.articles.filter(({favorited}) => favorited);
    }

    return articlesProps.articles;
  }, [articlesProps.articles, selectedTabIndex]);

  const onTabChange = useCallback(
    (selectedTabIndex: number) => {
      let predicate: Predicate = {favoritedBy: user?.username};

      if (selectedTabIndex === Tabs.myFeed) {
        predicate = {myFeed: 'true'};
      }

      if (selectedTabIndex === Tabs.myArticles) {
        predicate = {author: user?.username};
      }

      setPredicate(predicate);
      setSelectedTabIndex(selectedTabIndex);
    },
    [user?.username]
  );

  useEffect(() => {
    ArticlesStore.loadArticles(predicate);

    const unsubscribe = navigation.addListener('focus', () => {
      ArticlesStore.loadArticles(predicate);
    });

    return unsubscribe;
  }, [navigation, predicate, selectedTabIndex]);

  return {
    ...articlesProps,
    user,
    tabItems,
    articles,
    selectedTabIndex,
    onTabChange,
  };
};

export default useUserArticlesScreen;
