import React, { ComponentType, memo, FC, PropsWithChildren } from 'react';

import { Variant } from './enums';
import SC from './styled';

export interface Props {
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  variant?: Variant;
}

const RoundedTagPure: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => <SC.RoundedTag {...props}>{children}</SC.RoundedTag>;

export default memo(RoundedTagPure);
export { Variant } from './enums';
