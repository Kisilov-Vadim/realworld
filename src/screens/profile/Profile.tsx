import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {View, Text, Avatar} from 'react-native-ui-lib';

import {GuestStackParams} from '../../navigation/types';
import {Articles, ErrorScreen} from '../../components';
import useArticlesHook from '../../hooks/useArticlesHook';

type ProfileProps = StackScreenProps<GuestStackParams, 'Profile'>;

const Profile = ({route}: ProfileProps) => {
  const {author} = route.params;

  const {
    error,
    articles,
    isLoading,
    isUpdating,
    isRefreshing,
    onLoadArticles,
    onRefreshArticles,
    onErrorReloadPress,
  } = useArticlesHook({
    isProfile: true,
    predicate: {author: author.username},
  });

  return (
    <>
      <View center padding-s5 bg-white>
        <Avatar
          useAutoColors
          size={50}
          source={{uri: author.image}}
          name={author.username}
          label={author.username}
        />
        <Text marginT-s2 text60 blue30>
          {author.username}
        </Text>
      </View>
      <View flex>
        {error ? (
          <ErrorScreen onPress={onErrorReloadPress} />
        ) : (
          <Articles
            isLoading={isLoading}
            isUpdating={isUpdating}
            isRefreshing={isRefreshing}
            articles={articles}
            onLoadArticles={onLoadArticles}
            onRefreshArticles={onRefreshArticles}
          />
        )}
      </View>
    </>
  );
};

export default Profile;
