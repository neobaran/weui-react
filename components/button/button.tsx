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
  htmlType?: 'submit' | 'button' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

export const Button: React.FC<ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    size = 'default',
    disabled = false,
    loading = false,
    className,
    icon,
    htmlType,
    ...rest
  } = props;

  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const isCell = size === 'cell';

  const prefixCls = isCell ? 'weui-btn_cell' : 'weui-btn';

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const { onClick } = props;
    if (loading) {
      return;
    }
    if (props.href !== undefined && disabled) {
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
    className
  );

  const iconNode =
    icon &&
    React.isValidElement(icon) &&
    React.cloneElement(icon, {
      className: classNames(icon.props?.className, 'weui-btn_cell__icon'),
    });

  if (props.href !== undefined) {
    return (
      <a {...rest} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {props.children}
      </a>
    );
  }
  return (
    <button
      {...rest}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      ref={buttonRef}>
      {iconNode}
      {props.children}
    </button>
  );
};
