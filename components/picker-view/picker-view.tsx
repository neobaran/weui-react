import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

export interface PickerViewProps {
  value?: number[];
  onChange?: (values: number[]) => void;
}

const InternalPickerView: React.FC<PickerViewProps> = (props) => {
  const { value, onChange, children } = props;

  const [values, setValues] = React.useState(value || []);

  const childrenList = React.Children.map(children, (item) => {
    if (
      React.isValidElement(item)
        && typeof item.type !== 'string'
        && item.type.name === 'PickerViewColumn'
    ) {
      return item;
    }
    return null;
  })?.filter((item) => !!item) || [];

  React.useEffect(() => {
    const v = value || [];
    if (v) {
      v.concat(new Array(Math.max(childrenList.length - v.length, 0)).fill(0));
    }
    setValues(v);
  }, [value, childrenList.length]);

  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onChange && values) {
      onChange(values);
    }
  }, [values, onChange]);

  return (
    <div
      ref={ref}
      className="weui-picker__bd"
      onTouchStart={(e) => {
        e.preventDefault();
      }}
    >
      {React.Children.map(childrenList, (item, index) => React.cloneElement(item, {
        value: values[index] || 0,
        top: ref.current?.getBoundingClientRect().top,
        onChange: (v: number) => {
          const vs = [...values];
          vs[index] = v;
          setValues(vs);
        },
      }))}
    </div>
  );
};

const PickerViewColumn: React.FC<{
  value: number;
  top: number;
  onChange: (value: number) => void;
}> = (props) => {
  const {
    value: propValue = 0, top, onChange, children,
  } = props;

  const [value, setValue] = useState(propValue);

  const childrenList = React.Children.map(children, (item) => {
    if (React.isValidElement(item)) {
      return <div className="weui-picker__item">{item}</div>;
    }
    return null;
  })?.filter((item) => !!item) || [];

  const rowHeight = 48;
  const offset = 2;

  const start = useRef<number>();
  const startTime = useRef<number>();
  const points = useRef<Array<{ time: number; y: number }>>([]);

  const [transition, setTransition] = useState<string>();
  const [translate, setTranslate] = useState<number>(
    (offset - value) * rowHeight,
  );

  const translateValue = useRef(translate);

  useEffect(() => {
    translateValue.current = translate;
  }, [translate]);

  const handleChange = useCallback((diff: number) => {
    if (!translateValue.current) {
      translateValue.current = translate;
    }
    translateValue.current += diff || 0;

    translateValue.current = Math.round(translateValue.current / rowHeight) * rowHeight;

    const max = offset * rowHeight;
    const min = -(rowHeight * (childrenList.length - offset - 1));

    if (translateValue.current > max) {
      translateValue.current = max;
    }
    if (translateValue.current < min) {
      translateValue.current = min;
    }
    setTransition('all .3s');
    setTranslate(translateValue.current);

    let v = 0 - (translateValue.current / rowHeight - offset);
    v = Math.max(v, 0);
    v = Math.min(v, childrenList.length);
    onChange(v);
  }, [childrenList.length, onChange, translate]);

  useEffect(() => {
    if (propValue > childrenList.length - 1) {
      setValue(0);
      handleChange(rowHeight * offset);
    } else {
      setValue(propValue);
    }
  }, [propValue, childrenList.length, handleChange]);

  return (
    <div
      className="weui-picker__group"
      onTouchStartCapture={(e) => {
        e.stopPropagation();
        start.current = e.changedTouches[0].pageY;
        startTime.current = +new Date();
      }}
      onTouchMoveCapture={(e) => {
        e.stopPropagation();
        if (!start.current) return;
        const end = e.changedTouches[0].pageY;
        const diff = end - start.current;

        setTransition('all 0s');
        setTranslate(translateValue.current + diff);

        startTime.current = +new Date();
        points.current.push({ time: startTime.current, y: end });
        if (points.current.length > 40) {
          points.current.shift();
        }
      }}
      onTouchEndCapture={(e) => {
        e.stopPropagation();
        if (!start.current || !startTime.current) return;
        const endTime = +new Date();
        const relativeY = top + (5 * rowHeight) / 2;
        const end = e.changedTouches[0].pageY;

        if (endTime - startTime.current > 100) {
          if (Math.abs(end - start.current) > 10) {
            handleChange(end - start.current);
          } else {
            handleChange(relativeY - end);
          }
        } else if (Math.abs(end - start.current) > 10) {
          const endPos = points.current.length - 1;
          let startPos = endPos;
          for (
            let i = endPos;
            i > 0 && startTime.current - points.current[i].time < 100;
            i -= 1
          ) {
            startPos = i;
          }

          if (startPos !== endPos) {
            const ep = points.current[endPos];
            const sp = points.current[startPos];
            const t = ep.time - sp.time;
            const s = ep.y - sp.y;
            const v = s / t; // 出手时的速度
            const diff = v * 150 + (end - start.current); // 滑行 150ms,这里直接影响“灵敏度”
            handleChange(diff);
          } else {
            handleChange(0);
          }
        } else {
          handleChange(relativeY - end);
        }
        start.current = undefined;
      }}
    >
      <div
        className="weui-picker__mask"
        onTouchStart={(e) => {
          e.preventDefault();
        }}
      />
      <div className="weui-picker__indicator" />
      <div
        className="weui-picker__content"
        style={{
          transition,
          transform: `translate3d(0, ${translateValue.current}px, 0)`,
        }}
      >
        {childrenList}
      </div>
    </div>
  );
};

const PickerView = InternalPickerView;
(PickerView as any).Column = PickerViewColumn;

export { PickerView };
