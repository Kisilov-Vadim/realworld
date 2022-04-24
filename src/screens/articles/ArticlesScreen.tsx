import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, Articles} from '../../components';

import useArticlesScreen from './useArticlesScreen';

const ArticlesScreen = () => {
  const {
    articles,
    isLoading,
    chipsList,
    isUpdating,
    isRefreshing,
    articlesError,
    isTagsLoading,
    onLoadArticles,
    onRefreshArticles,
    onErrorReloadPress,
  } = useArticlesScreen();

  if (articlesError) {
    return <ErrorScreen onPress={onErrorReloadPress} message={articlesError} />;
  }

  return (
    <View flexG>
      <View paddingH-s5 paddingV-s3>
        <ChipsList isLoading={isTagsLoading} data={chipsList} />
      </View>

      <View flex>
        <Articles
          isLoading={isLoading}
          isUpdating={isUpdating}
          isRefreshing={isRefreshing}
          articles={articles}
          onLoadArticles={onLoadArticles}
          onRefreshArticles={onRefreshArticles}
        />
      </View>
    </View>
  );
};

export default observer(ArticlesScreen);
