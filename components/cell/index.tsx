import { Cell as InternalCell, CellProps, CellItemProps } from './cell';

export const Cell = InternalCell as React.FC<
React.HTMLAttributes<HTMLDivElement>
> & {
  Item: React.FC<CellItemProps<any>>;
};
export { CellProps, CellItemProps };
