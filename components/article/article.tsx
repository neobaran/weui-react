import classNames from 'classnames';
import React from 'react';

export type ArticleProps = React.HTMLAttributes<HTMLElement>;

export const Article: React.FC<ArticleProps> = (props) => {
  const { className, children } = props;
  return (
    <article {...props} className={classNames('weui-article', className)}>
      {children}
    </article>
  );
};
