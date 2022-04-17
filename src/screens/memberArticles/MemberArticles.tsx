import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Spinner} from 'native-base';
import {View} from 'react-native-ui-lib';

import {ChipsList, ErrorScreen, ArticleCard} from '../../components';
import {Article} from '../../store/articles/types';

import SkeletonMemberArticle from './SkeletonMemberArticle';
import useUserArticles from './useMemberArticles';

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

const MemberArticles = observer(() => {
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
  } = useUserArticles();

  if (isLoading) {
    return <SkeletonMemberArticle />;
  }

  if (error) {
    return <ErrorScreen onPress={onLoadArticles} message={error} />;
  }

  return (
    <>
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
    </>
  );
});

export default MemberArticles;
