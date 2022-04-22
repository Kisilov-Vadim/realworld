import {useMemo} from 'react';

import {Article} from '../../store/types';
import {formatDate} from '../../utils/date';

export type ArticleCardType = Article & {
  onPress?: () => void;
  onLikePress?: () => void;
  onAuthorPress?: () => void;
};

export type ArticleCardProps = {
  article: ArticleCardType;
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
