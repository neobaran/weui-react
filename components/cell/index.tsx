import { Cell as InternalCell, CellProps, CellItemProps } from './cell';

export const Cell = InternalCell as React.FC<CellProps> & {
  Item: React.FC<CellItemProps<any>>;
};
export { CellProps, CellItemProps };
