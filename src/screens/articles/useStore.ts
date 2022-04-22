import {TagsStore} from '../../store';

const useStore = () => {
  const {tags} = TagsStore;
  const isTagsLoading = TagsStore.isLoading && !tags.length;

  return {
    tags,
    isTagsLoading,
  };
};

export default useStore;
