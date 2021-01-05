import classNames from 'classnames';
import React from 'react';

export interface FormPreivewItemProps
  extends React.HTMLAttributes<HTMLElement> {
  key?: React.Key;
  label: React.ReactNode;
  value: React.ReactNode;
  emphasis?: boolean;
}

export interface FormPreivewProps extends React.HTMLAttributes<HTMLElement> {
  itemList: FormPreivewItemProps[];
  actions: Array<
  {
    type?: 'default' | 'primary';
  } & Partial<
  Omit<React.AnchorHTMLAttributes<any>, 'type'> &
  Omit<React.ButtonHTMLAttributes<any>, 'type'>
  >
  >;
}

const FormPreivewItem: React.FC<FormPreivewItemProps> = (props) => {
  const {
    label, value, className, ...ontherProps
  } = props;
  return (
    <div
      {...ontherProps}
      className={classNames('weui-form-preview__item', className)}
    >
      <span className="weui-form-preview__label">{label}</span>
      <span className="weui-form-preview__value">{value}</span>
    </div>
  );
};

export const FormPreivew: React.FC<FormPreivewProps> = (props) => {
  const {
    itemList = [], actions, className, ...ontherProps
  } = props;

  const emphasisList = React.useMemo(
    () => itemList.filter((item) => item.emphasis),
    [itemList],
  );

  const normalList = React.useMemo(
    () => itemList.filter((item) => !item.emphasis),
    [itemList],
  );

  return (
    <div
      {...ontherProps}
      className={classNames('weui-form-preview', className)}
    >
      {!!emphasisList.length && (
        <div className="weui-form-preview__hd">
          {emphasisList.map((item) => (
            <FormPreivewItem key={item.key} {...item} />
          ))}
        </div>
      )}
      {!!normalList.length && (
        <div className="weui-form-preview__bd">
          {normalList.map((item) => (
            <FormPreivewItem key={item.key} {...item} />
          ))}
        </div>
      )}
      {!!actions.length && (
        <div className="weui-form-preview__ft">
          {actions.map((item) => {
            const Component = item.href ? 'a' : 'button';
            const { type = 'default', ...itemProps } = item;
            return (
              <Component
                {...itemProps}
                className={classNames(
                  'weui-form-preview__btn',
                  `weui-form-preview__btn_${type}`,
                  item.className,
                )}
              >
                {item.children}
              </Component>
            );
          })}
        </div>
      )}
    </div>
  );
};
