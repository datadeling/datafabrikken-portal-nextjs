import React, {
  FC,
  ComponentPropsWithoutRef,
  memo,
  PropsWithChildren,
  ComponentType
} from 'react';
import NextLink from 'next/link';

import LinkIcon from '../icons/link-icon';
import ExternalLinkIcon from '../icons/external-link-icon';

import SC from './styled';
import { Variant } from './enums';

export interface Props extends ComponentPropsWithoutRef<'a'> {
  href: string;
  variant?: Variant;
  hideIcon?: boolean;
  external?: boolean;
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
}

const Link: FC<PropsWithChildren<Props>> = ({
  href,
  variant,
  hideIcon = false,
  children,
  external,
  ...props
}) =>
  external ? (
    <SC.Link $variant={variant} $external={external} {...props}>
      {children}
      {!hideIcon && external && <ExternalLinkIcon />}
    </SC.Link>
  ) : (
    <NextLink href={href} passHref>
      <SC.Link $variant={variant} $external={external} {...props}>
        {children}
        {!hideIcon && !external && <LinkIcon />}
        {!hideIcon && external && <ExternalLinkIcon />}
      </SC.Link>
    </NextLink>
  );

export default memo(Link);
export { Variant } from './enums';
