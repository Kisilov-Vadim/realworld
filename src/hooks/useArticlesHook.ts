import {useCallback, useMemo} from 'react';
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
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
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

  const onArticlePress = useCallback(
    (article: Article) => {
      navigation.push('Article', {article});
    },
    [navigation]
  );

  const onLikePress = useCallback(() => {
    if (user) return;

    navigation.push('AuthModal');
  }, [navigation, user]);

  const onAuthorPress = useCallback(
    (article: Article) => {
      navigation.push('Profile', {author: article.author});
    },
    [navigation]
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
    ArticlesStore.loadArticles(predicate);
  }, [isLastPage, predicate]);

  const onErrorReloadPress = useCallback(() => {
    ArticlesStore.loadArticles(predicate);

    if (withTags) {
      TagsStore.loadTags();
    }
  }, [predicate, withTags]);

  const onRefreshArticles = useCallback(
    () => ArticlesStore.refreshArticles(),
    []
  );

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
