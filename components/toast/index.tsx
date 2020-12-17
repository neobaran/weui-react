import { Toast as InternalToast, ToastProps } from './toast';

export const Toast = InternalToast as React.FC<ToastProps> & {
  show: (props: Omit<ToastProps, 'visible'>) => void;
};
export { ToastProps };
