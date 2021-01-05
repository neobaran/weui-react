import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

export interface ToptipsProps {
  type?: 'default' | 'warn' | 'info' | 'primary';
  message?: React.ReactNode;
  visible?: boolean;
  duration?: number;
  onClose?: () => void;
}

export const InternalToptips: React.FC<ToptipsProps> = (props) => {
  const {
    type = 'default',
    visible: propVisible,
    message,
    duration = 1500,
    onClose,
    children,
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

  return (
    <CSSTransition
      in={visible}
      timeout={100}
      classNames="nb-fade"
      unmountOnExit
    >
      <div className={classNames('weui-toptips', `weui-toptips_${type}`)}>
        {message}
        {children}
      </div>
    </CSSTransition>
  );
};

const Toptips: any = (props: ToptipsProps) => ReactDOM.createPortal(<InternalToptips {...props} />, document.body);

Toptips.show = (props: ToptipsProps) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return ReactDOM.render(<InternalToptips {...props} visible />, root);
};

export { Toptips };
