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

  const {profile, isProfileError, isProfileLoading} = useStore();

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
    if (!profile?.username) return;

    const unsubscribe = navigation.addListener('focus', () => {
      ArticlesStore.loadArticles({author: profile.username});
    });

    return unsubscribe;
  }, [navigation, profile?.username]);

  return {
    ...articlesProps,
    profile,
    isProfileError,
    isProfileLoading,
    isArticlesLoading: articlesProps.isLoading,
    onFollowPress,
    onProfileErrorReload,
  };
};

export default useProfileScreen;
