/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  value?: number;
  showValue?: boolean;
  onChange?: (value: number) => void;
}

const isDecimals = (number: number) => number % 1 !== 0;

const calcNumberOfDecimals = (number: number | string) => {
  number = +number;

  if (Number.isNaN(number) || !isDecimals(number)) {
    return 0;
  }

  const numberString = number.toString();

  if (/\./.test(numberString)) {
    return numberString.split('.')[1].length;
  }
  return +numberString.split('e-')[1];
};

export const Slider: React.FC<SliderProps> = (props) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    disabled,
    value = 0,
    showValue,
    onChange,
  } = props;
  const sliderRef = React.useRef<HTMLDivElement>();

  const sliderInnerRef = React.useRef<HTMLDivElement>();

  const [touching, setTouching] = React.useState(false);

  const [touchId, setTouchId] = React.useState<number | null>();

  const [totalWidth, setTotalWidth] = React.useState(0);

  const [startX, setStartX] = React.useState(0);

  const [startValue, setStartValue] = React.useState(value);

  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const percent = React.useMemo(
    () => `${((currentValue - min) / (max - min)) * 100}%`,
    [currentValue, min, max],
  );

  React.useEffect(() => {
    if (currentValue !== value && onChange) {
      onChange(currentValue);
    }
  }, [currentValue, value, onChange]);

  const maxDecimalsNumber = React.useMemo(
    () => Math.max(
      calcNumberOfDecimals(min),
      calcNumberOfDecimals(max),
      calcNumberOfDecimals(step),
    ),
    [min, max, step],
  );

  const setValueByStep = (val: number) => {
    const stepVal = Math.round(val / step) * step;
    setCurrentValue(Math.max(min, Math.min(stepVal, max)));
  };

  return (
    <div className="weui-slider-box">
      <div
        ref={(dom) => {
          sliderRef.current = dom!;
        }}
        className="weui-slider"
        onClick={(e) => {
          const clickPostionPercent = (e.clientX - (sliderRef.current?.offsetLeft || 0))
          / (sliderRef.current?.clientWidth || 0);
          setValueByStep((max - min) * clickPostionPercent);
        }}
      >
        <div
          ref={(dom) => {
            sliderInnerRef.current = dom!;
          }}
          className="weui-slider__inner"
        >
          <div className="weui-slider__track" style={{ width: percent }} />
          <div
            className="weui-slider__handler"
            style={{ left: percent }}
            onTouchStart={(e) => {
              if (touching || disabled) return;
              const { identifier, pageX } = e.targetTouches[0];
              setTouching(true);
              setTouchId(identifier);
              setTotalWidth(sliderInnerRef.current?.clientWidth || 0);
              setStartX(pageX);
              setStartValue(currentValue);
            }}
            onTouchMove={(e) => {
              if (!touching || disabled) return;
              const { identifier, pageX } = e.targetTouches[0];
              if (identifier !== touchId) return;
              setValueByStep(((pageX - startX) / totalWidth) * (max - min) + startValue);
            }}
            onTouchEnd={() => {
              if (!touching || disabled) return;
              setTouching(false);
              setTouchId(null);
            }}
          />
        </div>
      </div>
      {showValue && (
        <div className="weui-slider-box__value">
          {currentValue.toFixed(maxDecimalsNumber)}
        </div>
      )}
    </div>
  );
};
