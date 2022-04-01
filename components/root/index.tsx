import React, { memo, FC, PropsWithChildren } from 'react';

import SC from './styled';

interface Props {
  invertColor?: boolean;
}

const Root: FC<PropsWithChildren<Props>> = ({
  invertColor = false,
  children
}) => <SC.Root $invertColor={invertColor}>{children}</SC.Root>;

export default memo(Root);
