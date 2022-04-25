import screenIds from './screenIds';

export default {
  [screenIds.articles]: {
    name: screenIds.articles,
    title: '',
    component: require('../screens').ArticlesScreen,
  },
  [screenIds.article]: {
    name: screenIds.article,
    title: '',
    component: require('../screens').ArticleScreen,
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
  [screenIds.settingsModal]: {
    name: screenIds.settingsModal,
    title: 'Settings',
    component: require('../modals').SettingsModal,
  },
  [screenIds.createArticleModal]: {
    name: screenIds.createArticleModal,
    title: '',
    component: require('../modals').CreateArticleModal,
  },
};
