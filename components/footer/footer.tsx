import classNames from 'classnames';
import React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  links?: React.ReactNode[];
  fixed?: boolean;
}

export const Footer: React.FC<FooterProps> = (props) => {
  const {
    links, fixed, className, children,
  } = props;
  return (
    <footer
      className={classNames(
        'weui-footer',
        {
          'weui-footer_fixed-bottom': fixed,
        },
        className,
      )}
    >
      {!!links?.length && (
        <div className="weui-footer__links">
          {links.map((link) => {
            if (React.isValidElement(link)) {
              return React.cloneElement(link, {
                key: link.key,
                className: classNames(
                  'weui-footer__link',
                  link.props?.className,
                ),
              });
            }
            return link;
          })}
        </div>
      )}
      <div className="weui-footer__text">{children}</div>
    </footer>
  );
};
