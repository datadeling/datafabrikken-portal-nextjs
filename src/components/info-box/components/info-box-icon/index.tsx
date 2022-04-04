import React, { ComponentType, memo, FC, PropsWithChildren } from 'react';

interface Props {
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const InfoBoxIcon: FC<PropsWithChildren<Props>> = ({ children }) => (
  <>{children}</>
);

export default memo(InfoBoxIcon);
