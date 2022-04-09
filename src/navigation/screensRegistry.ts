import screenIds from './screenIds';

export default {
  [screenIds.posts]: {
    name: screenIds.posts,
    component: require('../screens').GlobalPostsScreen,
  },
};
