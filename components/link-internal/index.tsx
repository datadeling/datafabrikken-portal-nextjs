import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';
import LinkIcon from '../icons/link-icon';

import SC from './styled';

interface Props {
  to: string;
  hideIcon?: boolean;
}

const InternalLink: FC<PropsWithChildren<Props>> = ({
  to,
  hideIcon = false,
  children,
  ...props
}) => (
  <Link href={to} passHref>
    <SC.InternalLink {...props}>
      {children}
      {!hideIcon && <LinkIcon />}
    </SC.InternalLink>
  </Link>
);

export default InternalLink;
