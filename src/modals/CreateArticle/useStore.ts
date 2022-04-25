import {TagsStore} from '../../store';

const useStore = () => {
  const {tags} = TagsStore;

  return {
    tags,
  };
};

export default useStore;
