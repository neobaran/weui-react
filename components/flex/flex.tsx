import classNames from 'classnames';
import React from 'react';

const Flex: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, children, ...ontherProps } = props;
  return (
    <div {...ontherProps} className={classNames('weui-flex', className)}>
      {children}
    </div>
  );
};

const FlexItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className, children, ...ontherProps } = props;
  return (
    <div {...ontherProps} className={classNames('weui-flex__item', className)}>
      {children}
    </div>
  );
};

(Flex as any).Item = FlexItem;

export { Flex };
