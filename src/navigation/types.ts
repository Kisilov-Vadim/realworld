import {Article, Author} from '../store/types';

export type GuestStackParamsKeys = keyof GuestStackParams;
export type GuestStackParams = {
  Articles: undefined;
  Article: {article: Article};
  Profile: {author: Author};
  AuthModal: {isRegister: boolean} | undefined;
};

export type MemberStackParamsKeys = keyof MemberStackParams;
export type MemberStackParams = {
  Articles: undefined;
  Article: {article: Article};
  Profile: {author: Author};
  UserArticles: undefined;
  SettingsModal: undefined;
};

export type RootStackParams = GuestStackParams & MemberStackParams;
