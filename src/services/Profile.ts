import {Author} from '../store/types';

import requests from './requests';

export type ProfileResponse = {
  profile: Author;
};

export default {
  get: (username: string): Promise<ProfileResponse> =>
    requests.get(`/profiles/${username}`),
  follow: (username: string): Promise<ProfileResponse> =>
    requests.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string): Promise<ProfileResponse> =>
    requests.del(`/profiles/${username}/follow`),
};
