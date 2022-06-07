import React, { ComponentType, memo, FC, PropsWithChildren } from 'react';

import TitleIconBase from '../../../../../public/images/facts-default.inline.svg';

import SC from './styled';

interface Props {
  invertColor?: boolean;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const FactBoxTitle: FC<PropsWithChildren<Props>> = ({ children }) => (
  <SC.FactBoxTitle>
    <TitleIconBase />
    <SC.Title>{children}</SC.Title>
  </SC.FactBoxTitle>
);

export default memo(FactBoxTitle);
