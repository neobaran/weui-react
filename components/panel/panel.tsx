import classNames from 'classnames';
import React from 'react';

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  access?: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const {
    header, children, footer, access, className,
  } = props;
  return (
    <div
      {...props}
      className={classNames(
        'weui-panel',
        {
          'weui-panel_access': access,
        },
        className,
      )}
    >
      <div className="weui-panel__hd">{header}</div>
      <div className="weui-panel__bd">{children}</div>
      <div className="weui-panel__ft">{footer}</div>
    </div>
  );
};
