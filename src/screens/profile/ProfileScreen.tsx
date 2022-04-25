import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, Avatar} from 'react-native-ui-lib';
import {StackScreenProps} from '@react-navigation/stack';

import {GuestStackParams} from '../../navigation/types';
import {Articles, ErrorScreen} from '../../components';

import useProfileScreen from './useProfileScreen';
import NavigationRightButton from './NavigationRightButton';
import SkeletonProfileScreen from './SkeletonProfileScreen';

type ProfileScreenProps = StackScreenProps<GuestStackParams, 'Profile'>;

const ProfileScreen = ({route, navigation}: ProfileScreenProps) => {
  const {username} = route.params;

  const {
    user,
    profile,
    articles,
    isUpdating,
    isRefreshing,
    isProfileError,
    articlesError,
    isArticlesLoading,
    isProfileLoading,
    onFollowPress,
    onLoadArticles,
    onRefreshArticles,
    onProfileErrorReload,
  } = useProfileScreen({username});

  useEffect(() => {
    if (username === user?.username) return;

    navigation.setOptions({
      headerRight: profile
        ? () => (
            <NavigationRightButton
              isFollowed={profile.following}
              onPress={onFollowPress}
            />
          )
        : undefined,
    });
  }, [navigation, onFollowPress, profile, user?.username, username]);

  if (isProfileLoading) {
    return <SkeletonProfileScreen />;
  }

  if (isProfileError) {
    return (
      <ErrorScreen message={isProfileError} onPress={onProfileErrorReload} />
    );
  }

  return (
    <>
      <View center padding-s6 bg-blue80>
        <Avatar
          useAutoColors
          size={50}
          source={{uri: profile?.image}}
          name={profile?.username}
          label={profile?.username}
        />
        <Text marginT-s2 text60 blue30>
          {profile?.username}
        </Text>
      </View>
      <View flex>
        <Articles
          error={articlesError}
          isLoading={isArticlesLoading}
          isUpdating={isUpdating}
          isRefreshing={isRefreshing}
          articles={articles}
          onLoadArticles={onLoadArticles}
          onRefreshArticles={onRefreshArticles}
        />
      </View>
    </>
  );
};

export default observer(ProfileScreen);
