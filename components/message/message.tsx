import classNames from 'classnames';
import React from 'react';
import { Button } from '../button';
import { Icon, IconProps } from '../icon';

export interface MessageProps extends Omit<React.HTMLAttributes<any>, 'title'> {
  type?: IconProps['type'];
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttons?: React.ReactNode;
  tips?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Message: React.FC<MessageProps> = (props) => {
  const {
    type, title, description, buttons, tips, footer, children,
  } = props;
  return (
    <div className="weui-msg">
      {type && (
        <div className="weui-msg__icon-area">
          <Icon type={type} size="large" />
        </div>
      )}
      <div className="weui-msg__text-area">
        {title && <h2 className="weui-msg__title">{title}</h2>}
        {description && <p className="weui-msg__desc">{description}</p>}
        {children}
      </div>
      {buttons && (
        <div className="weui-msg__opr-area">
          <Button.Area>{buttons}</Button.Area>
        </div>
      )}
      {tips && (
        <div className="weui-msg__tips-area">
          {React.Children.map(tips, (item) => {
            if (!React.isValidElement(item)) return item;
            if (item.type !== React.Fragment) {
              return React.cloneElement(item, {
                key: item.key,
                className: classNames('weui-msg__tips', item.props.className),
              });
            }
            return <p className="weui-msg__tips">{item}</p>;
          })}
        </div>
      )}
      {footer && <div className="weui-msg__extra-area">{footer}</div>}
    </div>
  );
};
