import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, Articles} from '../../components';

import useArticlesScreen from './useArticlesScreen';

const ArticlesScreen = () => {
  const {
    error,
    articles,
    isLoading,
    chipsList,
    isUpdating,
    isRefreshing,
    isTagsLoading,
    onLoadArticles,
    onRefreshArticles,
    onErrorReloadPress,
  } = useArticlesScreen();

  if (error) {
    return <ErrorScreen onPress={onErrorReloadPress} message={error} />;
  }

  return (
    <View flexG>
      <View paddingH-s5 paddingV-s3>
        <ChipsList isLoading={isTagsLoading} data={chipsList} />
      </View>

      <Articles
        isLoading={isLoading}
        isUpdating={isUpdating}
        isRefreshing={isRefreshing}
        articles={articles}
        onLoadArticles={onLoadArticles}
        onRefreshArticles={onRefreshArticles}
      />
    </View>
  );
};

export default observer(ArticlesScreen);
