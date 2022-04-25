import {useState, useCallback, useMemo, useEffect} from 'react';
import {PickerValue} from 'react-native-ui-lib';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import ErrorMessages from '../../errorMessages';
import {ArticlesStore} from '../../store';
import {showErrorToast} from '../../utils/toast';
import {NewArticle} from '../../store/types';
import {MemberStackParams} from '../../navigation/types';

import useStore from './useStore';

export type CreateArticleProps = NativeStackScreenProps<
  MemberStackParams,
  'CreateArticleModal'
>;

const useCreateArticle = ({route, navigation}: CreateArticleProps) => {
  const {tags} = useStore();

  const article = route.params?.article;

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NewArticle>({
    title: article?.title || '',
    description: article?.description || '',
    body: article?.body || '',
    tagList: article?.tagList || [],
  });

  const isCreateButtonDisabled = useMemo(
    () => isLoading || Object.values(data).some((item) => !item),
    [data, isLoading]
  );

  const onTagPress = useCallback(
    (tag: string) => {
      const isSelected = data.tagList.find((item) => item === tag);
      if (isSelected) {
        setData((prev) => ({
          ...prev,
          tagList: data.tagList.filter((item) => item !== tag),
        }));
      } else {
        setData((prev) => ({
          ...prev,
          tagList: [...data.tagList, tag],
        }));
      }
    },
    [data.tagList]
  );

  const tagsList = useMemo(
    () =>
      tags.map((tag) => ({
        title: tag,
        selected: data.tagList.includes(tag),
        onPress: () => onTagPress(tag),
      })),
    [data.tagList, onTagPress, tags]
  );

  const onTitleChange = useCallback((title: string) => {
    setData((prev) => ({...prev, title}));
  }, []);

  const onDescriptionChange = useCallback((description: string) => {
    setData((prev) => ({...prev, description}));
  }, []);

  const onBodyChange = useCallback((body: string) => {
    setData((prev) => ({...prev, body}));
  }, []);

  const onTagsChange = useCallback((tagList: PickerValue) => {
    setData((prev) => ({...prev, tagList} as NewArticle));
  }, []);

  const onPublishArticlePress = useCallback(async () => {
    try {
      setIsLoading(true);
      if (article) {
        const updatedArticle = await ArticlesStore.updateArticle({
          ...data,
          slug: article.slug,
        });
        navigation.navigate({
          name: 'Article',
          params: {article: updatedArticle},
          merge: true,
        });
      } else {
        await ArticlesStore.createArticle(data);
        navigation.goBack();
      }
    } catch (err) {
      showErrorToast({title: ErrorMessages.createArticle});
    } finally {
      setIsLoading(false);
    }
  }, [article, data, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: article ? 'Edit Article' : 'Create Article',
    });
  }, [article, navigation]);

  return {
    data,
    tagsList,
    isLoading,
    isCreateButtonDisabled,
    onTitleChange,
    onDescriptionChange,
    onBodyChange,
    onTagsChange,
    onPublishArticlePress,
  };
};

export default useCreateArticle;
