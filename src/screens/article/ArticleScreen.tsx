import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native';
import {Button, Divider, Icon} from 'native-base';
import {View, Text, Colors} from 'react-native-ui-lib';
import {observer} from 'mobx-react-lite';

import {AntDesign} from '@expo/vector-icons';
import {RootStackParams} from '../../navigation/types';
import {ArticleAuthor, ChipsList} from '../../components';

import useArticleScreen from './useArticleScreen';
import ArticleScreenComments from './ArticleScreenComments';

type ArticleScreenProps = StackScreenProps<RootStackParams, 'Article'>;

const ArticleScreen = ({route}: ArticleScreenProps) => {
  const {article} = route.params;
  const {
    isGuest,
    commentsError,
    mappedComments,
    isCommentsLoading,
    onAuthorPress,
    onFollowPress,
    onFavoritePress,
    openAuthLoginModal,
    onCommentsErrorPress,
    openAuthRegisterModal,
  } = useArticleScreen({article});

  return (
    <ScrollView>
      <View padding-s5 bg-blue80>
        <Text blue30 text50BO marginB-s3>
          {article.title}
        </Text>
        <ArticleAuthor
          name={article.author.username}
          avatar={article.author.image}
          avatarSize={30}
          date={article.updatedAt}
          onPress={onAuthorPress}
        />
        <View row right>
          <Button
            mr={1}
            size="sm"
            colorScheme="red"
            variant={article.favorited ? undefined : 'outline'}
            onPress={onFavoritePress}
            leftIcon={
              <Icon
                as={AntDesign}
                name={article.favorited ? 'heart' : 'hearto'}
              />
            }
          >
            {article.favoritesCount}
          </Button>

          <Button
            size="sm"
            colorScheme="blue"
            variant={article.favorited ? undefined : 'outline'}
            onPress={onFollowPress}
            leftIcon={<AntDesign name="plus" size={16} color={Colors.blue30} />}
          >
            <View row center>
              <Text text80 blue40 marginR-s1>
                Follow
              </Text>
              <Text text80 blue40>
                {article.author.username}
              </Text>
            </View>
          </Button>
        </View>
      </View>

      <View padding-s5>
        <Text text70>{article.body}</Text>
      </View>

      <View paddingH-s5 marginB-s5>
        <ChipsList
          isPreview
          data={article.tagList.map((title) => ({
            title,
          }))}
        />
      </View>

      <Divider />

      {isGuest ? (
        <View row center paddingH-s5 paddingT-s2>
          <Button onPress={openAuthLoginModal} variant="link">
            <Text blue30>Sign In</Text>
          </Button>
          <Text>or</Text>
          <Button onPress={openAuthRegisterModal} variant="link">
            <Text blue30>Sign Up</Text>
          </Button>
          <Text>to add comments on this article.</Text>
        </View>
      ) : null}

      <ArticleScreenComments
        comments={mappedComments}
        error={commentsError}
        isLoading={isCommentsLoading}
        onReloadCommentsPress={onCommentsErrorPress}
      />
    </ScrollView>
  );
};

export default observer(ArticleScreen);
