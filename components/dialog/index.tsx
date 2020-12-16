import { Dialog as InternalDialog, DialogProps } from "./dialog";
export const Dialog = InternalDialog as React.FC<DialogProps> & {
  show: (props: Omit<DialogProps, "visible">) => void;
};
export { DialogProps };
