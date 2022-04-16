import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';
import {Spinner} from 'native-base';
import {View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, ArticleCard} from '../../components';
import {Article} from '../../store/articles/types';

import SkeletonArticle from './SkeletonArticle';
import useArticles from './useArticles';

const renderArticle = ({item}: ListRenderItemInfo<Article>) => (
  <ArticleCard article={item} />
);

const renderListFooterComponent = (isUpdating: boolean) => {
  if (isUpdating)
    return (
      <View paddingV-s5>
        <Spinner animating hidesWhenStopped size="lg" />
      </View>
    );
  return null;
};

const Articles = observer(() => {
  const {
    filteredArticles,
    chipsList,
    isLoading,
    error,
    isRefreshing,
    isUpdating,
    isTagsLoading,
    onLoadArticles,
    onRefreshArticles,
  } = useArticles();

  if (isLoading) {
    return <SkeletonArticle />;
  }

  if (error) {
    return <ErrorScreen onPress={onLoadArticles} message={error} />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View paddingH-s5 paddingV-s3>
        <ChipsList isLoading={isTagsLoading} data={chipsList} />
      </View>

      <FlatList
        refreshing={isRefreshing}
        keyExtractor={({slug}) => slug}
        data={filteredArticles}
        extraData={isRefreshing}
        renderItem={renderArticle}
        onRefresh={onRefreshArticles}
        onEndReached={onLoadArticles}
        onEndReachedThreshold={0.3}
        ListFooterComponent={() => renderListFooterComponent(isUpdating)}
      />
    </SafeAreaView>
  );
});

export default Articles;
