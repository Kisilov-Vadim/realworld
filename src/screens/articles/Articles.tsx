import React from 'react';
import {observer} from 'mobx-react-lite';
import {View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, Articles} from '../../components';

import useArticles from './useArticles';

const ArticlesScreen = observer(() => {
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
  } = useArticles();

  if (error) {
    return <ErrorScreen onPress={onErrorReloadPress} message={error} />;
  }

  return (
    <>
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
    </>
  );
});

export default ArticlesScreen;
