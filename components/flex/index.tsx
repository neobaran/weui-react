import { Flex as InternalFlex } from './flex';

export const Flex = InternalFlex as React.FC<
React.HTMLAttributes<HTMLDivElement>
> & {
  Item: React.FC<React.HTMLAttributes<HTMLDivElement>>;
};
