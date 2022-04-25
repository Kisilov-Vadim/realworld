import {Article} from '../store/types';

export type GuestStackParamsKeys = keyof GuestStackParams;
export type GuestStackParams = {
  Articles: undefined;
  Article: {article: Article};
  Profile: {username: string};
  AuthModal: {isRegister: boolean} | undefined;
};

export type MemberStackParamsKeys = keyof MemberStackParams;
export type MemberStackParams = {
  Articles: undefined;
  Article: {article: Article};
  Profile: {username: string};
  UserArticles: undefined;
  SettingsModal: undefined;
  CreateArticleModal: {article: Article} | undefined;
};

export type RootStackParams = GuestStackParams & MemberStackParams;
