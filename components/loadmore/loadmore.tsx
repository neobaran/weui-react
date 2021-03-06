import classNames from 'classnames';
import React from 'react';
import { Loading } from '../loading';

export interface LoadmoreProps extends React.HTMLAttributes<HTMLElement> {
  type: 'default' | 'line';
  tips?: React.ReactNode;
}

export const Loadmore: React.FC<LoadmoreProps> = (props) => {
  const {
    type, tips, className, ...ontherProps
  } = props;

  return (
    <div
      {...ontherProps}
      className={classNames(
        'weui-loadmore',
        {
          'weui-loadmore_line': type === 'line',
          'weui-loadmore_dot': type === 'line' && !tips,
        },
        className,
      )}
    >
      {type && <Loading type="primary" />}
      <span className="weui-loadmore__tips">{tips}</span>
    </div>
  );
};
