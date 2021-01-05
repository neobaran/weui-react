import classNames from 'classnames';
import React from 'react';

interface DefaultLoadingProps {
  type: 'default';
}

interface PrimaryLoadingProps {
  type: 'primary';
  color?: 'default' | 'brand' | 'transparent';
}

export type LoadingProps = Omit<React.HTMLAttributes<HTMLElement>, 'color'> &
(DefaultLoadingProps | PrimaryLoadingProps);

export const Loading: React.FC<LoadingProps> = (props) => {
  const { type, className, ...ontherProps } = props;
  return (
    <span
      {...ontherProps}
      className={classNames(
        type === 'primary' ? 'weui-primary-loading' : 'weui-loading',
        {
          [`weui-primary-loading_${
            (props as PrimaryLoadingProps).color || ''
          }`]: type === 'primary' && !!(props as PrimaryLoadingProps).color,
        },
        className,
      )}
    >
      {type === 'primary' && <span className="weui-primary-loading__dot" />}
    </span>
  );
};
