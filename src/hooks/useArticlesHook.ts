import {useCallback, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Article} from '../store/types';
import ErrorMessages from '../errorMessages';
import {showErrorToast} from '../utils/toast';
import {Predicate} from '../store/Articles';
import {RootStackParams} from '../navigation/types';
import {ArticlesStore, TagsStore, UserStore} from '../store';
import {ArticleCardType} from '../components/articleCard/useArticleCard';
import useShowErrorHook from './useShowErrorHook';

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

  const onLikePress = useCallback(
    (slug: string, favorited: boolean) => {
      if (!user) {
        return navigation.push('AuthModal');
      }

      try {
        if (favorited) {
          ArticlesStore.unFavorite(slug);
        } else {
          ArticlesStore.favorite(slug);
        }
      } catch (err) {
        showErrorToast({title: ErrorMessages.default});
      }
    },
    [navigation, user]
  );

  const onAuthorPress = useCallback(
    (article: Article) => {
      navigation.push('Profile', {username: article.author.username});
    },
    [navigation]
  );

  const articles = storeArticles.map((article) => {
    const newArticle: ArticleCardType = {
      ...article,
      onPress: () => onArticlePress(article),
      onLikePress: () => onLikePress(article.slug, article.favorited),
    };

    if (!isProfile) {
      newArticle.onAuthorPress = () => onAuthorPress(article);
    }

    return newArticle;
  });

  const {error: articlesError} = useShowErrorHook({
    error,
    isEmpty: !!articles.length,
  });

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
    articles,
    isLoading,
    isUpdating,
    isRefreshing,
    articlesError,
    onLoadArticles,
    onRefreshArticles,
    onErrorReloadPress,
  };
};

export default useArticlesHook;
