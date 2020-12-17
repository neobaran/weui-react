import classNames from 'classnames';
import React from 'react';

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  type:
  | 'circle'
  | 'download'
  | 'info'
  | 'safe-success'
  | 'safe-warn'
  | 'success'
  | 'success-circle'
  | 'success-no-circle'
  | 'waiting'
  | 'waiting-circle'
  | 'warn'
  | 'info-circle'
  | 'cancel'
  | 'search'
  | 'clear'
  | 'back'
  | 'delete'
  | 'success-no-circle-thin'
  | 'arrow'
  | 'arrow-bold'
  | 'back-arrow'
  | 'back-arrow-thin'
  | 'close'
  | 'close-thin'
  | 'back-circle';
  size?: 'small' | 'large';
  primary?: boolean;
}

export const Icon: React.FC<IconProps> = (props) => {
  const {
    type, size = 'small', primary, className,
  } = props;
  return (
    <i
      {...props}
      className={classNames(
        `weui-icon-${type}`,
        {
          'weui-icon_msg': size === 'large',
          'weui-icon_msg-primary': primary,
        },
        className,
      )}
    />
  );
};
