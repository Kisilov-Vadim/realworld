/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Avatar, TouchableOpacity, View, Text} from 'react-native-ui-lib';

import useArticleAuthor, {ArticleAuthorProps} from './useArticleAuthor';

export const AVATAR_SIZE = 36;

const ArticleAuthor = (props: ArticleAuthorProps) => {
  const {avatar, name, avatarSize, onPress} = props;
  const {formattedDate} = useArticleAuthor(props);

  return (
    <TouchableOpacity row centerV onPress={onPress} disabled={!onPress}>
      <Avatar
        useAutoColors
        size={avatarSize ?? AVATAR_SIZE}
        source={{uri: avatar}}
        name={name}
        label={formattedDate}
      />
      <View marginL-s2>
        <Text text90 {...(onPress ? {blue30: true} : {})}>
          {name}
        </Text>
        <Text text100L>{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleAuthor;
