import React, { FC } from 'react';

import SC from './styled';

const linkIconSrc =
  '/../../../public/images/icon-arrow-right-regular.inline.svg';

interface Props {
  light?: boolean;
}

const LinkIcon: FC<Props> = () => (
  <SC.LinkIcon layout='fill' src={linkIconSrc} />
);

export default LinkIcon;
