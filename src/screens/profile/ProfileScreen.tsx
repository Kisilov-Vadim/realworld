import React from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, Avatar} from 'react-native-ui-lib';
import {StackScreenProps} from '@react-navigation/stack';

import {GuestStackParams} from '../../navigation/types';
import {Articles, ErrorScreen} from '../../components';

import useProfileScreen from './useProfileScreen';

type ProfileScreenProps = StackScreenProps<GuestStackParams, 'Profile'>;

const ProfileScreen = ({route}: ProfileScreenProps) => {
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
  } = useProfileScreen({author});

  return (
    <>
      <View center padding-s6 bg-blue80>
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

export default observer(ProfileScreen);
