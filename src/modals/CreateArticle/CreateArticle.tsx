import {Box, Button, Input, Spinner, TextArea} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';

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
        <Box alignItems="center">
          <Input
            mb={4}
            size="lg"
            value={data.title}
            placeholder="Title"
            disabled={isLoading}
            onChangeText={onTitleChange}
          />
          <Input
            mb={4}
            size="lg"
            disabled={isLoading}
            value={data.description}
            placeholder="What's this article about?"
            onChangeText={onDescriptionChange}
          />
          <TextArea
            mb={8}
            size="lg"
            value={data.body}
            numberOfLines={4}
            isDisabled={isLoading}
            placeholder="Write your article (in markdown)"
            onChangeText={onBodyChange}
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
        </Box>
      </View>
    </ScrollView>
  );
};

export default CreateArticle;
