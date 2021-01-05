import classNames from 'classnames';
import React from 'react';

export type ArticleProps = React.HTMLAttributes<HTMLElement>;

export const Article: React.FC<ArticleProps> = (props) => {
  const { className, children, ...ontherProps } = props;
  return (
    <article {...ontherProps} className={classNames('weui-article', className)}>
      {children}
    </article>
  );
};
