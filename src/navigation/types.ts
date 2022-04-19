import {Author} from '../store/articles/types';

export type GuestStackParamsKeys = keyof GuestStackParams;
export type GuestStackParams = {
  Articles: undefined;
  Profile: {author: Author};
  AuthModal: undefined;
};

export type MemberStackParamsKeys = keyof MemberStackParams;
export type MemberStackParams = {
  Articles: undefined;
  UserArticles: undefined;
};

export type RootStackParams = GuestStackParams & MemberStackParams;
