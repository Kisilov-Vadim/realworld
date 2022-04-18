import {ArticlesStore, TagsStore, UserStore} from '../../store';

const useStore = () => {
  const {
    error,
    isRefreshing,
    data: articles,
    isLoading: isArticlesLoading,
  } = ArticlesStore.getArticles();

  const isLoading = isArticlesLoading && !articles.length;
  const isUpdating = isArticlesLoading && !!articles.length;

  const tags = TagsStore.getTags();
  const isTagsLoading = TagsStore.getIsLoading() && !tags.length;

  const user = UserStore.getUser();

  return {
    isLoading,
    isRefreshing,
    isUpdating,
    isTagsLoading,
    error,
    articles,
    tags,
    user,
  };
};

export default useStore;
