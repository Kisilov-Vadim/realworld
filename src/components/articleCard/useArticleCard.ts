import {useMemo} from 'react';

import {Article} from '../../store/types';

export type ArticleCardType = Article & {
  onPress?: () => void;
  onLikePress?: () => void;
  onAuthorPress?: () => void;
};

export type ArticleCardProps = {
  article: ArticleCardType;
};

const useArticleCard = ({article}: ArticleCardProps) => {
  const tagsList = useMemo(
    () =>
      article.tagList?.map((title) => ({
        title,
      })),
    [article.tagList]
  );

  return {
    tagsList,
  };
};

export default useArticleCard;
