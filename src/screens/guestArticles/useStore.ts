import {ArticlesStore, TagsStore} from '../../store';

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

  return {
    isLoading,
    isRefreshing,
    isUpdating,
    isTagsLoading,
    error,
    articles,
    tags,
  };
};

export default useStore;
