import classNames from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

export interface ActionSheetProps {
  title?: React.ReactNode;
  itemList: Array<
  {
    key?: React.Key
    children: React.ReactNode;
    warn?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
  } & Omit<React.AnchorHTMLAttributes<any>, 'onClick'>
  >;
  cancelText?: React.ReactNode;
  visible?: boolean;
  onClose?: (
    e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>
  ) => void;
}

export const ActionSheet: React.FC<ActionSheetProps> = (props) => {
  const {
    title,
    itemList = [],
    cancelText = '取消',
    visible: propVisible,
    onClose,
  } = props;

  const [visible, setVisible] = React.useState(propVisible || false);

  React.useEffect(() => {
    setVisible(propVisible || false);
  }, [propVisible]);

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    setVisible(false);
    onClose && onClose(e);
  };

  return (
    <>
      <CSSTransition
        in={visible}
        timeout={300}
        classNames="nb-fade"
        unmountOnExit
      >
        <div className="weui-mask" onClick={handleClose} />
      </CSSTransition>
      <div
        className={classNames('weui-actionsheet', {
          'weui-actionsheet_toggle': visible,
        })}
      >
        {title && (
          <div className="weui-actionsheet__title">
            <div className="weui-actionsheet__title-text">{title}</div>
          </div>
        )}
        <div className="weui-actionsheet__menu">
          {itemList.map((item) => {
            const classes = classNames('weui-actionsheet__cell', {
              'weui-actionsheet__cell_warn': item.warn,
            });
            const handleClick = (
              e: React.MouseEvent<
              HTMLDivElement | HTMLAnchorElement,
              MouseEvent
              >,
            ) => {
              const { onClick } = item;
              if (onClick) {
                (onClick as React.MouseEventHandler<
                HTMLDivElement | HTMLAnchorElement
                >)(e);
              }
              handleClose(e);
            };
            if (item.href !== undefined) {
              return (
                <a {...item} className={classes} onClick={handleClick}>
                  {item.children}
                </a>
              );
            }
            return (
              <div {...item} className={classes} onClick={handleClick}>
                {item.children}
              </div>
            );
          })}
        </div>
        <div className="weui-actionsheet__action">
          <div className="weui-actionsheet__cell" onClick={handleClose}>
            {cancelText}
          </div>
        </div>
      </div>
    </>
  );
};
