import {useMemo} from 'react';

import {Article} from '../../store/articles/types';
import {formatDate} from '../../utils/date';

export type ArticleCardProps = {
  article: Article & {
    onPress?: () => void;
    onLikePress?: () => void;
    onAuthorPress?: () => void;
  };
};

export const AVATAR_SIZE = 36;

const useArticleCard = ({article}: ArticleCardProps) => {
  const formattedArticleDate = formatDate(article.updatedAt);

  const tagsList = useMemo(
    () =>
      article.tagList.map((title) => ({
        title,
      })),
    [article.tagList]
  );

  return {
    tagsList,
    formattedArticleDate,
  };
};

export default useArticleCard;
