import classNames from 'classnames';
import { Loading } from 'components/loading';
import React from 'react';

export interface LoadmoreProps extends React.HTMLAttributes<HTMLElement> {
  type: 'default' | 'line';
  tips?: React.ReactNode;
}

export const Loadmore: React.FC<LoadmoreProps> = (props) => {
  const { type, tips, className } = props;

  return (
    <div
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
