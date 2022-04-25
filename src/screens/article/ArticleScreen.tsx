/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ScrollView} from 'react-native';
import {Button, Divider, Icon, Spinner} from 'native-base';
import {View, Text} from 'react-native-ui-lib';
import {observer} from 'mobx-react-lite';

import {AntDesign, Ionicons} from '@expo/vector-icons';
import {RootStackParams} from '../../navigation/types';
import {ArticleAuthor, ChipsList} from '../../components';

import useArticleScreen from './useArticleScreen';
import ArticleScreenComments from './ArticleScreenComments';

type ArticleScreenProps = StackScreenProps<RootStackParams, 'Article'>;

const ArticleScreen = ({route}: ArticleScreenProps) => {
  const {article} = route.params;

  const {
    isGuest,
    isAuthor,
    commentsError,
    mappedComments,
    isCommentsLoading,
    isDeleteLoading,
    onLikePress,
    onAuthorPress,
    openAuthLoginModal,
    openAuthRegisterModal,
    onCommentsErrorPress,
    onEditPress,
    onDeletePress,
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
        <View row centerV spread marginT-s5>
          <View>
            {isAuthor ? (
              <View row center>
                <Button
                  mr={3}
                  size="sm"
                  variant="solid"
                  colorScheme="blue"
                  onPress={onEditPress}
                  leftIcon={
                    <Ionicons name="create-outline" size={20} color="white" />
                  }
                >
                  Edit
                </Button>

                <Button
                  mr={1}
                  size="sm"
                  colorScheme="red"
                  variant="solid"
                  onPress={onDeletePress}
                  leftIcon={
                    isDeleteLoading ? (
                      <Spinner color="white" />
                    ) : (
                      <Ionicons name="trash" size={20} color="white" />
                    )
                  }
                >
                  Delete
                </Button>
              </View>
            ) : null}
          </View>

          <Button
            mr={1}
            size="sm"
            colorScheme="blue"
            variant={article.favorited ? undefined : 'outline'}
            onPress={onLikePress}
            leftIcon={
              <Icon
                as={AntDesign}
                name={article.favorited ? 'heart' : 'hearto'}
              />
            }
          >
            {article.favoritesCount}
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
