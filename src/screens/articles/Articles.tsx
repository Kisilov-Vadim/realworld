import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Divider, Spinner} from 'native-base';
import {Colors, View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, ArticleCard} from '../../components';
import {Article} from '../../store/articles/types';

import SkeletonArticles from './SkeletonArticles';
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
    error,
    isLoading,
    chipsList,
    isUpdating,
    articlesList,
    isRefreshing,
    isTagsLoading,
    onLoadArticles,
    onRefreshArticles,
  } = useArticles();

  if (error) {
    return <ErrorScreen onPress={onLoadArticles} message={error} />;
  }

  return (
    <>
      <View paddingH-s5 paddingV-s3>
        <ChipsList isLoading={isTagsLoading} data={chipsList} />
      </View>

      {isLoading ? (
        <SkeletonArticles />
      ) : (
        <FlatList
          refreshing={isRefreshing}
          keyExtractor={({slug}) => slug}
          data={articlesList}
          extraData={isRefreshing}
          renderItem={renderArticle}
          onRefresh={onRefreshArticles}
          onEndReached={onLoadArticles}
          onEndReachedThreshold={0.3}
          ItemSeparatorComponent={() => <Divider color={Colors.grey50} />}
          ListFooterComponent={() => renderListFooterComponent(isUpdating)}
        />
      )}
    </>
  );
});

export default Articles;
