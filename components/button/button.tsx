import React from 'react';
import classNames from 'classnames';

export interface BaseButtonProps {
  type?: 'default' | 'primary' | 'warn';
  size?: 'default' | 'cell' | 'mini';
  disabled: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: React.ButtonHTMLAttributes<any>['type'];
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    size = 'default',
    disabled = false,
    loading = false,
    icon,
    htmlType,
    href,
    className,
    children,
    ...ontherProps
  } = props;

  const isCell = size === 'cell';

  const prefixCls = isCell ? 'weui-btn_cell' : 'weui-btn';

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    const { onClick } = props;
    if (loading) {
      return;
    }
    if (href !== undefined && disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<
      HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  const classes = classNames(
    prefixCls,
    `${prefixCls}${isCell ? '-' : '_'}${type}`,
    { 'weui-btn_loading': loading },
    { 'weui-btn_disabled': disabled },
    { 'weui-btn_mini': size === 'mini' },
    className,
  );

  const iconNode = icon
    && React.isValidElement(icon)
    && React.cloneElement(icon, {
      className: classNames(icon.props?.className, 'weui-btn_cell__icon'),
    });

  if (href !== undefined) {
    return (
      <a {...ontherProps} className={classes} href={href} onClick={handleClick}>
        {iconNode}
        {children}
      </a>
    );
  }
  return (
    <button
      {...ontherProps}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
    >
      {iconNode}
      {children}
    </button>
  );
};

export interface ButtonAreaProps extends React.HTMLAttributes<any> {
  direction?: 'vertical' | 'horizontal';
}

const Area: React.FC<ButtonAreaProps> = (props) => {
  const {
    direction = 'vertical', children, className, ...otherProps
  } = props;
  return (
    <div
      {...otherProps}
      className={classNames(
        'weui-btn-area',
        { 'weui-btn-area_inline': direction === 'horizontal' },
        className,
      )}
    >
      {children}
    </div>
  );
};

(Button as any).Area = Area;

export { Button };
