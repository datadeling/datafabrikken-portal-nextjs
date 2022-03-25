import React, { FC } from 'react';

import Translation from '../../translation';

import SC from './styled';

import env from '../../../env';
import { PATHNAME } from '../../../types/enums';

import FolderIcon from '../../../public/images/icon-folder.inline.svg';
import ClockIcon from '../../../public/images/icon-clock.inline.svg';
import FlameIcon from '../../../public/images/icon-flame.inline.svg';
import InfoIcon from '../../../public/images/icon-info.inline.svg';
import LoginIcon from '../../../public/images/icon-login.inline.svg';

const { COMMUNITY_API_HOST } = env;

interface Props {}

const CommunityMenu: FC<Props> = () => (
  <SC.Menu>
    <li>
      <SC.Link href={PATHNAME.COMMUNITY}>
        <a>
          <FolderIcon />
          <Translation id='community.header.categories' />
        </a>
      </SC.Link>
    </li>
    <li>
      <SC.Link href={PATHNAME.COMMUNITY_TAGS}>
        <a>
          <SC.TopicIcon />
          <Translation id='community.header.tags' />
        </a>
      </SC.Link>
    </li>
    <li>
      <SC.Link href={PATHNAME.COMMUNITY_RECENT}>
        <a>
          <ClockIcon />
          <Translation id='community.header.recent' />
        </a>
      </SC.Link>
    </li>
    <li>
      <SC.Link href={PATHNAME.COMMUNITY_POPULAR}>
        <a>
          <FlameIcon />
          <Translation id='community.header.popular' />
        </a>
      </SC.Link>
    </li>
    {false && (
      <li>
        <SC.Link href={PATHNAME.COMMUNITY_ABOUT}>
          <a>
            <InfoIcon />
            <Translation id='community.header.about' />
          </a>
        </SC.Link>
      </li>
    )}
    {false && (
      <li>
        <SC.ExternalLink href={`${COMMUNITY_API_HOST}/login`} target='_self'>
          <LoginIcon />
          <Translation id='community.header.login' />
        </SC.ExternalLink>
      </li>
    )}
  </SC.Menu>
);

export default CommunityMenu;
