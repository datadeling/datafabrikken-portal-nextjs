import React, { memo, FC, PropsWithChildren } from 'react';

import ScrollToTop from '../scroll-to-top';
import SC from './styled';

interface Props {
  invertColor?: boolean;
}

const Root: FC<PropsWithChildren<Props>> = ({
  invertColor = false,
  children
}) => (
  <SC.Root $invertColor={invertColor}>
    {children}
    <ScrollToTop invertColor={invertColor} />
  </SC.Root>
);

export default memo(Root);
