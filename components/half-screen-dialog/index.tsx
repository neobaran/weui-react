import {
  HalfScreenDialog as InternalHalfScreenDialog,
  HalfScreenDialogProps,
} from "./half-screen-dialog";
export const HalfScreenDialog = InternalHalfScreenDialog as React.FC<HalfScreenDialogProps> & {
  show: (props: Omit<HalfScreenDialogProps, "visible">) => void;
};
export { HalfScreenDialogProps };
