import {ArticlesStore, TagsStore, UserStore} from '../../store';

const useStore = () => {
  const {
    error,
    articles,
    isLastPage,
    isRefreshing,
    totalPagesCount,
    isLoading: isArticlesLoading,
  } = ArticlesStore;

  const isLoading = isArticlesLoading && !articles.length;
  const isUpdating = isArticlesLoading && !!articles.length;

  const tags = TagsStore.getTags();
  const isTagsLoading = TagsStore.getIsLoading() && !tags.length;

  const user = UserStore.getUser();

  return {
    user,
    tags,
    error,
    articles,
    isLoading,
    isUpdating,
    isLastPage,
    isRefreshing,
    isTagsLoading,
    totalPagesCount,
  };
};

export default useStore;
