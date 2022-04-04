import React, { ComponentType, memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  truncate?: boolean;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const InfoBoxBody: FC<PropsWithChildren<Props>> = ({
  truncate = true,
  as,
  children,
  ...props
}) => (
  <SC.Body as={as} truncate={truncate} {...props}>
    {children}
  </SC.Body>
);

export default memo(InfoBoxBody);
