import React from 'react';
import {Button, Divider, Icon} from 'native-base';
import {AntDesign} from '@expo/vector-icons';
import {
  View,
  Avatar,
  Text,
  Colors,
  TouchableOpacity,
} from 'react-native-ui-lib';

import useArticleCard, {ArticleCardProps, AVATAR_SIZE} from './useArticleCard';
import ChipsList from '../chipsList';

const ArticleCard = (props: ArticleCardProps) => {
  const {formattedArticleDate, tagsList} = useArticleCard(props);

  const {
    article: {onPress, title, description, author, favorited, favoritesCount},
  } = props;

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View padding-s5>
        <View row centerV spread marginB-s3>
          <View row centerV>
            <Avatar
              useAutoColors
              size={AVATAR_SIZE}
              source={{uri: author.image}}
              name={author.username}
              label={author.username}
            />
            <View marginL-s2>
              <Text text90>{author.username}</Text>
              <Text text100L>{formattedArticleDate}</Text>
            </View>
          </View>
          <Button
            size="sm"
            colorScheme="success"
            variant={favorited ? undefined : 'outline'}
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
      <Divider color={Colors.grey50} />
    </TouchableOpacity>
  );
};

export default ArticleCard;
