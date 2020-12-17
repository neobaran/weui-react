import classNames from "classnames";
import React from "react";

export interface BaseMediaBoxProps {
  type?: "text" | "appmsg" | "small_appmsg";
  header?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

export type AnchorMediaBoxProps = {
  href: string;
} & BaseMediaBoxProps &
  React.AnchorHTMLAttributes<any>;

export type NativeMediaBoxProps = BaseMediaBoxProps & React.HTMLAttributes<any>;

export type MediaBoxProps = Partial<AnchorMediaBoxProps & BaseMediaBoxProps>;

export const MediaBox: React.FC<MediaBoxProps> = (props) => {
  const Component = props.href ? "a" : "div";

  const { type = "text" } = props;

  const titleNode = () => {
    const { title } = props;
    if (React.isValidElement(title)) {
      return React.cloneElement(title, {
        className: classNames("weui-media-box__title", title.props.className),
      });
    }
    return title;
  };

  return (
    <Component
      {...props}
      className={classNames(
        "weui-media-box",
        {
          "weui-media-box_text": type === "text",
          "weui-media-box_appmsg": type === "appmsg",
          "weui-media-box_small-appmsg": type === "small_appmsg",
        },
        props.className
      )}
    >
      <div className="weui-media-box__hd">
        {React.Children.map(props.header, (item) => {
          if (
            React.isValidElement(item) &&
            item.type === "img" &&
            !item.props.className
          ) {
            return React.cloneElement(item, {
              className: "weui-media-box__thumb",
            });
          }
          return item;
        })}
      </div>
      <div className="weui-media-box__bd">{titleNode}</div>
    </Component>
  );
};
