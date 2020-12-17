import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export interface DialogProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  visible?: boolean;
  showCancel?: boolean;
  confirmText?: React.ReactNode;
  confirmProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
  cancelText?: React.ReactNode;
  cancelProps?: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
  onConfirm?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const InternalDialog: React.FC<DialogProps> = (props) => {
  const {
    title,
    content,
    visible: propVisible,
    showCancel = true,
    confirmText = '确定',
    confirmProps,
    cancelText = '取消',
    cancelProps,
    onConfirm,
    onCancel,
  } = props;

  const [visible, setVisible] = React.useState(propVisible || false);

  React.useEffect(() => {
    setVisible(propVisible || false);
  }, [propVisible]);

  const handleClose = (
    _: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    setVisible(false);
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
        <div className="weui-dialog">
          {title && (
            <div className="weui-dialog__hd">
              <strong className="weui-dialog__title">{title}</strong>
            </div>
          )}
          <div className="weui-dialog__bd">{content}</div>
          <div className="weui-dialog__ft">
            {showCancel && (
              <a
                {...cancelProps}
                className={classNames(
                  'weui-dialog__btn',
                  'weui-dialog__btn_default',
                  cancelProps?.className,
                )}
                onClick={(e) => {
                  onCancel && onCancel(e);
                  handleClose(e);
                }}
              >
                {cancelText}
              </a>
            )}
            <a
              {...confirmProps}
              className={classNames(
                'weui-dialog__btn',
                'weui-dialog__btn_primary',
                confirmProps?.className,
              )}
              onClick={(e) => {
                onConfirm && onConfirm(e);
                handleClose(e);
              }}
            >
              {confirmText}
            </a>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

const Dialog: any = (props: DialogProps) => ReactDOM.createPortal(<InternalDialog {...props} />, document.body);

Dialog.show = (props: DialogProps) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return ReactDOM.render(<InternalDialog {...props} visible />, root);
};

export { Dialog };
