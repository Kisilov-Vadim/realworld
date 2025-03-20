import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Spinner} from 'native-base';
import {TextField, View} from 'react-native-ui-lib';

import {ChipsList} from '../../components';

import useCreateArticle, {CreateArticleProps} from './useCreateArticle';

const CreateArticle = (props: CreateArticleProps) => {
  const {
    data,
    tagsList,
    isLoading,
    isCreateButtonDisabled,
    onTitleChange,
    onDescriptionChange,
    onBodyChange,
    onPublishArticlePress,
  } = useCreateArticle(props);

  return (
    <ScrollView>
      <View flex paddingH-s5 paddingT-s10>
        <TextField
          value={data.title}
          placeholder="Title"
          isDisabled={isLoading}
          onChangeText={onTitleChange}
          preset={TextField.presets.OUTLINE}
        />
        <TextField
          isDisabled={isLoading}
          value={data.description}
          placeholder="What's this article about?"
          onChangeText={onDescriptionChange}
          preset={TextField.presets.OUTLINE}
        />
        <TextField
          value={data.body}
          numberOfLines={4}
          isDisabled={isLoading}
          placeholder="Write your article (in markdown)"
          onChangeText={onBodyChange}
          preset={TextField.presets.OUTLINE}
        />

        <View flex marginB-s10>
          <ChipsList data={tagsList} />
        </View>

        <Button
          colorScheme="success"
          disabled={isCreateButtonDisabled}
          onPress={onPublishArticlePress}
        >
          {isLoading ? <Spinner color="white" /> : 'Publish Article'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default CreateArticle;
