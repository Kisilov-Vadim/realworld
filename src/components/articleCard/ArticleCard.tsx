import React from 'react';
import {Button, Icon} from 'native-base';
import {AntDesign} from '@expo/vector-icons';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib';

import ChipsList from '../chipsList';

import {ArticleAuthor} from '..';
import useArticleCard, {ArticleCardProps} from './useArticleCard';

const ArticleCard = (props: ArticleCardProps) => {
  const {tagsList} = useArticleCard(props);

  const {
    article: {
      title,
      description,
      author,
      favorited,
      favoritesCount,
      updatedAt,
      onPress,
      onLikePress,
      onAuthorPress,
    },
  } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View padding-s5>
        <View row centerV spread marginB-s3>
          <ArticleAuthor
            name={author.username}
            avatar={author.image}
            date={updatedAt}
            onPress={onAuthorPress}
          />
          <Button
            size="sm"
            colorScheme="blue"
            variant={favorited ? undefined : 'outline'}
            onPress={onLikePress}
            leftIcon={
              <Icon as={AntDesign} name={favorited ? 'heart' : 'hearto'} />
            }
          >
            {favoritesCount}
          </Button>
        </View>
        <View>
          <Text text60 marginB-s2>
            {title}
          </Text>
          <Text text80R numberOfLines={2}>
            {description}
          </Text>
        </View>
        <View row marginT-s3>
          <ChipsList isPreview data={tagsList} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;
