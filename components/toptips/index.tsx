import { Toptips as InternalToptips, ToptipsProps } from './toptips';

export const Toptips = InternalToptips as React.FC<ToptipsProps> & {
  show: (props: Omit<ToptipsProps, 'visible'>) => void;
};
export { ToptipsProps };
