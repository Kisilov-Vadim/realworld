import {useEffect, useMemo} from 'react';
import {Toast} from 'native-base';

type UseShowErrorParams = {
  isEmpty: boolean;
  error?: string;
};

const useShowErrorHook = ({error, isEmpty}: UseShowErrorParams) => {
  const showErrorScreen = useMemo(() => error && isEmpty, [error, isEmpty]);

  useEffect(() => {
    if (showErrorScreen || !error) return;

    Toast.show({title: error, bgColor: 'red.500', duration: 3000});
  }, [error, showErrorScreen]);

  return {
    showErrorScreen,
  };
};

export default useShowErrorHook;
