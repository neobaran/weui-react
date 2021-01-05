import {
  PickerView as InternalPickerView,
  PickerViewProps,
} from './picker-view';

export const PickerView = InternalPickerView as React.FC<PickerViewProps> & {
  Column: React.FC;
};
export { PickerViewProps };
