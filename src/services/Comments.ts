import {Comment} from '../store/types';

import requests from './requests';

export type CommentGetResponse = {
  comments: Comment[];
};

export type CommentCreateResponse = {
  comment: Comment;
};

export default {
  get: (slug: string): Promise<CommentGetResponse> =>
    requests.get(`/articles/${slug}/comments`),
  create: (slug: string, comment: string): Promise<CommentCreateResponse> =>
    requests.post(`/articles/${slug}/comments`, {comment}),
  delete: (slug: string, commentId: string): Promise<void> =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
};
