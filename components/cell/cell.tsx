import classNames from 'classnames';
import React from 'react';

export interface CellProps extends Omit<React.HTMLAttributes<any>, 'title'> {
  title?: React.ReactNode;
  footer?: React.ReactNode;
}
export interface CellItemProps<T>
  extends Omit<React.AnchorHTMLAttributes<any>, 'title'> {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
  access?: boolean;
  htmlComponent?: 'a' | 'div' | 'label';
  customComponent?: {
    component: any;
    props: T;
  };
}

const Cell: React.FC<CellProps> = (props) => {
  const {
    title, footer, className, children, ...otherProps
  } = props;
  return (
    <>
      {!!title && <div className="weui-cells__title">{title}</div>}
      <div {...otherProps} className={classNames('weui-cells', className)}>
        {children}
      </div>
      {!!footer && <div className="weui-cells__tips">{footer}</div>}
    </>
  );
};

function CellItem<T = any>(props: CellItemProps<T>) {
  const {
    htmlComponent = 'div',
    customComponent,
    icon,
    label,
    value,
    access,
    className,
    children,
    ...otherProps
  } = props;

  const Component: any = React.useMemo(() => {
    let c: any;
    if (customComponent) {
      c = customComponent.component;
    } else {
      c = otherProps.href ? 'a' : htmlComponent;
    }
    return c;
  }, [customComponent, htmlComponent, otherProps.href]);

  return (
    <Component
      {...otherProps}
      {...customComponent?.props}
      className={classNames(
        'weui-cell',
        {
          'weui-cell_access': access,
        },
        className,
      )}
    >
      {!!icon && <div className="weui-cell__hd">{icon}</div>}
      <div className="weui-cell__bd">{label}</div>
      <div className="weui-cell__ft">{value || children}</div>
    </Component>
  );
}

(Cell as any).Item = CellItem;

export { Cell };
