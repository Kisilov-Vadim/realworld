import {Toast} from 'native-base';

type ToastOptions = {
  title: string;
  duration?: number;
};

export const showErrorToast = ({title, duration = 3000}: ToastOptions) => {
  Toast.show({
    title,
    bgColor: 'red.500',
    duration,
  });
};
