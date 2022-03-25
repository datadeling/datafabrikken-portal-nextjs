import React, { FC } from 'react';

import SC from './styled';

import type { CommunityTag } from '../../../types';
import { PATHNAME } from '../../../types/enums';

const Tag: FC<CommunityTag> = ({ value, valueEscaped }) => (
  <SC.Tag href={`${PATHNAME.COMMUNITY_TAGS}/${valueEscaped}`}>
    <a>{value}</a>
  </SC.Tag>
);

export default Tag;
