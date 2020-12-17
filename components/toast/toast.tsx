// import classNames from "classnames";
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export interface ToastProps {
  title: React.ReactNode;
  icon?: 'success' | 'warn' | 'loading' | 'none';
  image?: React.ReactNode;
  duration?: number;
  mask?: boolean;
  visible?: boolean;
  onClose?: () => void;
}

const InternalToast: React.FC<ToastProps> = (props) => {
  const {
    title,
    icon = 'success',
    image,
    duration = 1500,
    mask,
    visible: propVisible,
    onClose,
  } = props;

  const [visible, setVisible] = React.useState(propVisible || false);

  React.useEffect(() => {
    setVisible(propVisible || false);
  }, [propVisible]);

  React.useEffect(() => {
    if (duration && visible) {
      setTimeout(() => {
        setVisible(false);
      }, duration);
    }
  }, [duration, visible]);

  React.useEffect(() => {
    if (!visible) {
      onClose && onClose();
    }
  }, [visible, onClose]);

  const iconNode = React.useMemo(() => {
    switch (icon) {
      case 'success':
        return <i className="weui-icon_toast weui-icon-success-no-circle" />;
      case 'warn':
        return <i className="weui-icon_toast weui-icon-warn" />;
      case 'loading':
        return (
          <span className="weui-icon_toast weui-primary-loading weui-primary-loading_transparent">
            <span className="weui-primary-loading__dot" />
          </span>
        );
      case 'none':
      default:
        return <></>;
    }
  }, [icon]);

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      classNames="nb-fade"
      unmountOnExit
    >
      <div>
        {mask && <div className="weui-mask_transparent" />}
        <div className="weui-toast">
          {image || iconNode}
          <p className="weui-toast__content">{title}</p>
        </div>
      </div>
    </CSSTransition>
  );
};

const Toast: any = (props: ToastProps) => ReactDOM.createPortal(<InternalToast {...props} />, document.body);

Toast.show = (props: ToastProps) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return ReactDOM.render(<InternalToast {...props} visible />, root);
};

export { Toast };
