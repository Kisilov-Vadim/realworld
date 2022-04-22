import requests from './requests';

export type TagsResponse = {
  tags: string[];
};

export default {
  get: (): Promise<TagsResponse> => requests.get('/tags'),
};
