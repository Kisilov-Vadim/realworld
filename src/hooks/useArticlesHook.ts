import {useCallback, useEffect, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Article} from '../store/types';
import {Predicate} from '../store/ArticlesStore';
import {RootStackParams} from '../navigation/types';
import {ArticlesStore, TagsStore, UserStore} from '../store';
import {ArticleCardType} from '../components/articleCard/useArticleCard';

type UseArticlesHookParams = {
  predicate: Predicate;
  withTags?: boolean;
  isProfile?: boolean;
};

const useArticlesHook = ({
  predicate,
  withTags,
  isProfile,
}: UseArticlesHookParams) => {
  const {push} = useNavigation<StackNavigationProp<RootStackParams>>();
  const {user} = UserStore;
  const {
    error,
    isLastPage,
    isRefreshing,
    articles: storeArticles,
    isLoading: isArticlesLoading,
  } = ArticlesStore;

  const isLoading = useMemo(
    () => isArticlesLoading && !storeArticles.length,
    [isArticlesLoading, storeArticles.length]
  );
  const isUpdating = useMemo(
    () => isArticlesLoading && !!storeArticles.length,
    [isArticlesLoading, storeArticles.length]
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

  const articles = useMemo(
    () =>
      storeArticles.map((article) => {
        const newArticle: ArticleCardType = {
          ...article,
          onPress: () => onArticlePress(article),
          onLikePress: () => onLikePress(),
        };

        if (!isProfile) {
          newArticle.onAuthorPress = () => onAuthorPress(article);
        }

        return newArticle;
      }),
    [storeArticles, isProfile, onArticlePress, onLikePress, onAuthorPress]
  );

  const onLoadArticles = useCallback(() => {
    if (isLastPage) return;
    ArticlesStore.fetchArticles(predicate);
  }, [isLastPage, predicate]);

  const onErrorReloadPress = useCallback(() => {
    ArticlesStore.fetchArticles(predicate);

    if (withTags) {
      TagsStore.loadTags();
    }
  }, [predicate, withTags]);

  const onRefreshArticles = useCallback(
    () => ArticlesStore.refreshArticles(),
    []
  );

  useEffect(() => {
    ArticlesStore.fetchArticles(predicate);

    if (withTags) {
      TagsStore.loadTags();
    }
  }, []);

  return {
    error,
    articles,
    isLoading,
    isUpdating,
    isRefreshing,
    onLoadArticles,
    onRefreshArticles,
    onErrorReloadPress,
  };
};

export default useArticlesHook;
