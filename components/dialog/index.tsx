import { Dialog as InternalDialog, DialogProps } from "./dialog";
export const Dialog = InternalDialog as React.FC<DialogProps> & {
  showModal: (props: DialogProps) => void;
};
export { DialogProps };
