import requests from './requests';

export default {
  get: (): {tags: string[]} => requests.get('/tags'),
};
