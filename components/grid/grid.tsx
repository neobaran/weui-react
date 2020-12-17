import classNames from 'classnames';
import React from 'react';

const Grids: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, children } = props;
  return <div className={classNames('weui-grids', className)}>{children}</div>;
};

export interface GridProps extends React.HTMLAttributes<HTMLAnchorElement> {
  icon: React.ReactNode;
  label: React.ReactNode;
}

const Grid: React.FC<GridProps> = (props) => {
  const { icon, label, className } = props;
  return (
    <a {...props} className={classNames('weui-grid', className)}>
      <div className="weui-grid__icon">
        {typeof icon === 'string' ? <img src={icon} alt="" /> : icon}
      </div>
      <div className="weui-grid__label">{label}</div>
    </a>
  );
};

(Grids as any).Grid = Grid;

export { Grids };
