import { Grids as InternalGrids, GridProps } from './grid';

export const Grids = InternalGrids as React.FC<
React.HTMLAttributes<HTMLDivElement>
> & {
  Grid: React.FC<GridProps>;
};
export { GridProps };
