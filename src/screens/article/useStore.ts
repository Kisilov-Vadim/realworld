import {CommentsStore, UserStore} from '../../store';

const useStore = () => {
  const {comments, error, isLoading} = CommentsStore;
  const {user} = UserStore;

  const isCommentsLoading = isLoading && !comments.length;

  return {
    user,
    error,
    comments,
    isCommentsLoading,
  };
};

export default useStore;
