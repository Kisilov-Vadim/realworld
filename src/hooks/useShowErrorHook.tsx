import {useEffect, useMemo} from 'react';
import {showErrorToast} from '../utils/toast';

type UseShowErrorParams = {
  isEmpty: boolean;
  error?: string;
};

const useShowErrorHook = ({error, isEmpty}: UseShowErrorParams) => {
  const showErrorScreen = useMemo(() => !!error && isEmpty, [error, isEmpty]);

  useEffect(() => {
    if (showErrorScreen || !error) return;

    showErrorToast({title: error});
  }, [error, showErrorScreen]);

  return {
    error: showErrorScreen ? error : undefined,
  };
};

export default useShowErrorHook;
