import {formatDate} from '../../utils/date';

export type ArticleAuthorProps = {
  date: string;
  name: string;
  avatar?: string;
  avatarSize?: number;
  onPress?: () => void;
};

const useArticleAuthor = ({date}: ArticleAuthorProps) => {
  const formattedDate = formatDate(date);

  return {formattedDate};
};

export default useArticleAuthor;
