import classNames from 'classnames';
import React from 'react';

export interface BaseMediaBoxProps {
  type?: 'text' | 'appmsg' | 'small_appmsg';
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  info?: Array<{
    key?: React.Key;
    children?: React.ReactNode;
    extra?: boolean;
  }>;
  htmlComponent?: 'a' | 'div' | 'label';
  customComponent?: {
    component: any;
    props: any;
  };
}

export type AnchorMediaBoxProps = {
  href: string;
} & BaseMediaBoxProps &
Omit<React.AnchorHTMLAttributes<any>, 'title'>;

export type NativeMediaBoxProps = BaseMediaBoxProps & React.HTMLAttributes<any>;

export type MediaBoxProps = Partial<AnchorMediaBoxProps & BaseMediaBoxProps>;

export const MediaBox: React.FC<MediaBoxProps> = (props) => {
  const {
    htmlComponent = 'div',
    customComponent,
    type = 'text',
    title,
    description,
    header,
    info,
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

  const titleNode = React.useMemo(() => {
    if (typeof title === 'string') {
      return <h4 className="weui-media-box__title">{title}</h4>;
    }
    if (React.isValidElement(title)) {
      return React.cloneElement(title, {
        className: classNames('weui-media-box__title', title.props.className),
      });
    }
    return title;
  }, [title]);

  const descriptionNode = React.useMemo(() => {
    if (typeof description === 'string') {
      return <p className="weui-media-box__desc">{description}</p>;
    }
    if (React.isValidElement(description)) {
      return React.cloneElement(description, {
        className: classNames(
          'weui-media-box__desc',
          description.props.className,
        ),
      });
    }
    return description;
  }, [description]);

  return (
    <Component
      {...otherProps}
      className={classNames(
        'weui-media-box',
        {
          'weui-media-box_text': type === 'text',
          'weui-media-box_appmsg': type === 'appmsg',
          'weui-media-box_small-appmsg': type === 'small_appmsg',
        },
        className,
      )}
    >
      <div className="weui-media-box__hd">
        {React.Children.map(header, (item) => {
          if (
            React.isValidElement(item)
            && item.type === 'img'
            && !item.props.className
          ) {
            return React.cloneElement(item, {
              key: item.key,
              className: 'weui-media-box__thumb',
            });
          }
          return item;
        })}
      </div>
      {(titleNode || descriptionNode) && (
        <div className="weui-media-box__bd">
          {titleNode}
          {descriptionNode}
        </div>
      )}
      {!!info?.length && (
        <ul className="weui-media-box__info">
          {info.map((item) => (
            <li
              key={item.key}
              className={classNames('weui-media-box__info__meta', {
                'weui-media-box__info__meta_extra': item.extra,
              })}
            >
              {item.children}
            </li>
          ))}
        </ul>
      )}
      {children}
    </Component>
  );
};
