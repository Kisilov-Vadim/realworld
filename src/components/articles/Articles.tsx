import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {Divider, Spinner} from 'native-base';

import {View, Colors} from 'react-native-ui-lib';

import {Article} from '../../store/types';

import ArticleCard from '../articleCard';

import SkeletonArticles from './SkeletonArticles';

type ArticlesProps = {
  isLoading: boolean;
  articles: Article[];
  isUpdating?: boolean;
  isRefreshing?: boolean;
  onLoadArticles?: () => void;
  onRefreshArticles?: () => void;
};

const ArticlesDivider = () => <Divider color={Colors.grey50} />;

const renderArticle = ({item}: ListRenderItemInfo<Article>) => (
  <ArticleCard article={item} />
);

const renderListFooterComponent = (isUpdating?: boolean) => {
  if (isUpdating)
    return (
      <View paddingV-s5>
        <Spinner animating hidesWhenStopped size="lg" />
      </View>
    );

  return null;
};

const Articles = ({
  articles,
  isLoading,
  isUpdating,
  isRefreshing,
  onLoadArticles,
  onRefreshArticles,
}: ArticlesProps) => {
  if (isLoading) {
    return <SkeletonArticles />;
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      keyExtractor={({slug}) => slug}
      data={articles}
      extraData={isRefreshing}
      renderItem={renderArticle}
      onRefresh={onRefreshArticles}
      onEndReached={onLoadArticles}
      onEndReachedThreshold={0.3}
      ItemSeparatorComponent={ArticlesDivider}
      ListFooterComponent={() => renderListFooterComponent(isUpdating)}
    />
  );
};

export default Articles;
