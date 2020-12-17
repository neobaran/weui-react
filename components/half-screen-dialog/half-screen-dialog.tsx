// import classNames from "classnames";
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export interface HalfScreenDialogProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  tips?: React.ReactNode;
  footer?: React.ReactNode;
  backIcon?: 'close' | 'back-arrow';
  moreIcon?: boolean;
  onMoreClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  visible?: boolean;
  onClose?: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => void;
}

const InternalHalfScreenDialog: React.FC<HalfScreenDialogProps> = (props) => {
  const {
    title,
    subTitle,
    description,
    tips,
    footer,
    backIcon = 'close',
    moreIcon,
    onMoreClick,
    visible: propVisible,
    onClose,
    children,
  } = props;

  const [visible, setVisible] = React.useState(propVisible || false);

  React.useEffect(() => {
    setVisible(propVisible || false);
  }, [propVisible]);

  const handleClose = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => {
    setVisible(false);
    onClose && onClose(e);
  };

  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="nb-fade"
      unmountOnExit
    >
      <div>
        <div className="weui-mask" onClick={handleClose} />
        <div className="weui-half-screen-dialog">
          <div className="weui-half-screen-dialog__hd">
            <div className="weui-half-screen-dialog__hd__side">
              <button className="weui-icon-btn" onClick={handleClose}>
                <i className={`weui-icon-${backIcon}-thin`} />
              </button>
            </div>
            {title && (
              <div className="weui-half-screen-dialog__hd__main">
                <strong className="weui-half-screen-dialog__title">
                  {title}
                </strong>
                {subTitle && (
                  <span className="weui-half-screen-dialog__subtitle">
                    {subTitle}
                  </span>
                )}
              </div>
            )}
            {moreIcon && (
              <div className="weui-half-screen-dialog__hd__side">
                <button
                  className="weui-icon-btn"
                  onClick={(e) => {
                    onMoreClick && onMoreClick(e);
                  }}
                >
                  更多
                  <i className="weui-icon-more" />
                </button>
              </div>
            )}
          </div>
          <div className="weui-half-screen-dialog__bd">
            {description && (
              <div className="weui-half-screen-dialog__desc">{description}</div>
            )}
            {tips && (
              <div className="weui-half-screen-dialog__tips">{tips}</div>
            )}
            {children}
          </div>
          {footer && (
            <div className="weui-half-screen-dialog__ft">{footer}</div>
          )}
        </div>
      </div>
    </CSSTransition>
  );
};

const HalfScreenDialog: any = (props: HalfScreenDialogProps) => ReactDOM.createPortal(<InternalHalfScreenDialog {...props} />, document.body);

HalfScreenDialog.show = (props: HalfScreenDialogProps) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return ReactDOM.render(
    <InternalHalfScreenDialog {...props} visible />,
    root,
  );
};

export { HalfScreenDialog };
