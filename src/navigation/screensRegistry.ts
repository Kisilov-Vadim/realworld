import screenIds from './screenIds';

export default {
  [screenIds.articles]: {
    name: screenIds.articles,
    title: '',
    component: require('../screens').ArticlesScreen,
  },
  [screenIds.userArticles]: {
    name: screenIds.userArticles,
    title: '',
    component: require('../screens').UserArticlesScreen,
  },
  [screenIds.profile]: {
    name: screenIds.profile,
    title: '',
    component: require('../screens').ProfileScreen,
  },
  [screenIds.authModal]: {
    name: screenIds.authModal,
    title: '',
    component: require('../modals').AuthModal,
  },
};
