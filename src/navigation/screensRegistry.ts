import screenIds from './screenIds';

export default {
  [screenIds.guestArticles]: {
    name: screenIds.guestArticles,
    title: '',
    component: require('../screens').GuestArticlesScreen,
  },
  [screenIds.memberArticles]: {
    name: screenIds.memberArticles,
    title: '',
    component: require('../screens').MemberArticlesScreen,
  },
  [screenIds.personalArticles]: {
    name: screenIds.personalArticles,
    title: '',
    component: require('../screens').PersonalArticlesScreen,
  },
  [screenIds.authModal]: {
    name: screenIds.authModal,
    title: '',
    component: require('../modals').AuthModal,
  },
};
