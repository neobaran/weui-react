import {
  Button as InternalButton,
  ButtonProps,
  ButtonAreaProps,
} from './button';

export const Button = InternalButton as React.FC<ButtonProps> & {
  Area: React.FC<ButtonAreaProps>;
};
export { ButtonProps, ButtonAreaProps };
