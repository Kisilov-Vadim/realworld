import React from 'react';
import {observer} from 'mobx-react-lite';
import {View, Text, Avatar, TabController} from 'react-native-ui-lib';

import {Articles} from '../../components';

import useUserArticlesScreen from './useUserArticlesScreen';

const UserArticlesScreen = () => {
  const {
    user,
    articles,
    tabItems,
    isLoading,
    isUpdating,
    isRefreshing,
    articlesError,
    selectedTabIndex,
    onTabChange,
    onLoadArticles,
    onRefreshArticles,
  } = useUserArticlesScreen();

  return (
    <>
      <View center padding-s6 bg-blue80>
        <Avatar
          useAutoColors
          size={50}
          source={{uri: user?.image}}
          name={user?.username}
          label={user?.username}
        />
        <Text marginT-s2 text60 blue30>
          {user?.username}
        </Text>
      </View>

      <TabController
        asCarousel
        initialIndex={selectedTabIndex}
        onChangeIndex={onTabChange}
        items={tabItems}
      >
        <TabController.TabBar />

        <TabController.PageCarousel>
          <TabController.TabPage index={0}>
            <Articles
              error={articlesError}
              isLoading={isLoading}
              isUpdating={isUpdating}
              isRefreshing={isRefreshing}
              articles={articles}
              onLoadArticles={onLoadArticles}
              onRefreshArticles={onRefreshArticles}
            />
          </TabController.TabPage>

          <TabController.TabPage index={1}>
            <Articles
              error={articlesError}
              isLoading={isLoading}
              isUpdating={isUpdating}
              isRefreshing={isRefreshing}
              articles={articles}
              onLoadArticles={onLoadArticles}
              onRefreshArticles={onRefreshArticles}
            />
          </TabController.TabPage>

          <TabController.TabPage index={2}>
            <Articles
              error={articlesError}
              isLoading={isLoading}
              isUpdating={isUpdating}
              isRefreshing={isRefreshing}
              articles={articles}
              onLoadArticles={onLoadArticles}
              onRefreshArticles={onRefreshArticles}
            />
          </TabController.TabPage>
        </TabController.PageCarousel>
      </TabController>
    </>
  );
};

export default observer(UserArticlesScreen);
