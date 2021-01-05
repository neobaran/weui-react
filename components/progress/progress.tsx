import classNames from 'classnames';
import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLElement> {
  percent?: number;
  format?: (percent: number) => string;
}

const validProgress = (progress: number | undefined) => {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
};

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent = 0,
    format = (p) => `${p}%`,
    className,
    children,
    ...ontherProps
  } = props;

  return (
    <div {...ontherProps} className={classNames('weui-progress', className)}>
      <div className="weui-progress__bar">
        <div
          className="weui-progress__inner-bar"
          style={{ width: format(validProgress(percent)) }}
        />
      </div>
      <div className="weui-progress__opr">{children}</div>
    </div>
  );
};
