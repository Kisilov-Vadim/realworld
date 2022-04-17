import screenIds from './screenIds';

export default {
  [screenIds.guestArticles]: {
    name: screenIds.guestArticles,
    component: require('../screens').GuestArticlesScreen,
  },
  [screenIds.authModal]: {
    name: screenIds.authModal,
    component: require('../modals').AuthModal,
  },
};
