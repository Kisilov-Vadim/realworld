import React from 'react';
import {Divider, Spinner} from 'native-base';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {View, Colors, Text} from 'react-native-ui-lib';

import {Article} from '../../store/types';

import ArticleCard from '../articleCard';
import ErrorScreen from '../ErrorScreen';

import SkeletonArticles from './SkeletonArticles';

type ArticlesProps = {
  isLoading: boolean;
  articles: Article[];
  error?: string;
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

const renderEmptyList = () => (
  <View paddingV-s10 paddingH-s5 center>
    <Text text60BO>Articles are empty</Text>
  </View>
);

const Articles = ({
  articles,
  error,
  isLoading,
  isUpdating,
  isRefreshing,
  onLoadArticles,
  onRefreshArticles,
}: ArticlesProps) => {
  if (isLoading) {
    return <SkeletonArticles />;
  }

  if (error) {
    return <ErrorScreen message={error} onPress={onLoadArticles} />;
  }

  return (
    <View flex>
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
        ListEmptyComponent={() => renderEmptyList()}
      />
    </View>
  );
};

export default Articles;
