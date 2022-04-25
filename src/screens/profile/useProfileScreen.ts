import {useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {ArticlesStore, ProfileStore} from '../../store';
import useArticlesHook from '../../hooks/useArticlesHook';

import useStore from './useStore';

type UseProfileScreenParams = {
  username: string;
};

const useProfileScreen = ({username}: UseProfileScreenParams) => {
  const navigation = useNavigation();

  const {profile, user, isProfileError, isProfileLoading} = useStore();

  const articlesProps = useArticlesHook({
    isProfile: true,
    predicate: {author: username},
  });

  const onProfileErrorReload = useCallback(() => {
    ProfileStore.loadProfile(username);
  }, [username]);

  const onFollowPress = useCallback(() => {
    if (profile?.following) {
      ProfileStore.unfollow();
    } else {
      ProfileStore.follow();
    }
  }, [profile?.following]);

  useEffect(() => {
    ProfileStore.loadProfile(username);
  }, [username]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ArticlesStore.loadArticles({author: username});
    });

    return unsubscribe;
  }, [navigation, username]);

  return {
    ...articlesProps,
    user,
    profile,
    isProfileError,
    isProfileLoading,
    isArticlesLoading: articlesProps.isLoading,
    onFollowPress,
    onProfileErrorReload,
  };
};

export default useProfileScreen;
