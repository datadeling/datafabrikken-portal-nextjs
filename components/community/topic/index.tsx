import React, { FC, memo } from 'react';
import { compose } from 'redux';
import Link from 'next/link';

import Tag from '../tag';
import User from '../user';

import SC from './styled';
import type { CommunityTopic } from '../../../types';

import { formatDate } from '../../../utils/date';
import { PATHNAME } from '../../../types/enums';

import EyeIcon from '../../../public/images/icon-eye.inline.svg';
import LikeIcon from '../../../public/images/icon-like.inline.svg';
import PostIcon from '../../../public/images/icon-post.inline.svg';
import LinkIcon from '../../icons/link-icon';
import PinnedIcon from '../../../public/images/icon-pinned.inline.svg';

import translations from '../../../services/translations';

interface ExternalProps {
  topic: CommunityTopic;
  hideUserInfoAndTags?: boolean;
}

interface Props extends ExternalProps {}

const Topic: FC<Props> = ({ topic, hideUserInfoAndTags = false }) => {
  const topicOwner = topic.user;
  return (
    <Link
      href={`${PATHNAME.COMMUNITY}/${topic.category.slug}/${topic.slug}`}
      passHref
    >
      <SC.Topic>
        {topic.pinned > 0 && (
          <SC.Pinned title={`${translations.translate('community.pinned')}`}>
            <PinnedIcon />
          </SC.Pinned>
        )}
        <SC.Info>
          <SC.Title>
            {topic.title}
            <LinkIcon />
          </SC.Title>
          {!hideUserInfoAndTags && (
            <SC.SubTitle>
              <SC.UserTime>
                <User user={topicOwner} />
                {formatDate(new Date(topic.timestamp))}
              </SC.UserTime>
              <SC.Tags>
                {topic?.tags?.map((tag, index) => (
                  <Tag key={`tag_${index}`} {...tag} />
                ))}
              </SC.Tags>
            </SC.SubTitle>
          )}
        </SC.Info>
        <SC.Statistics>
          <li
            title={`${
              topic.votes < 0 ? 0 : topic.votes
            } ${translations.translate('community.votes')}`}
          >
            <span>
              <LikeIcon />
            </span>
            {topic.votes < 0 ? 0 : topic.votes}
          </li>
          <li
            title={`${topic.postcount} ${translations.translate(
              'community.posts'
            )}`}
          >
            <span>
              <PostIcon />
            </span>
            {topic.postcount}
          </li>
          <li
            title={`${topic.viewcount} ${translations.translate(
              'community.views'
            )}`}
          >
            <span>
              <EyeIcon />
            </span>
            {topic.viewcount}
          </li>
        </SC.Statistics>
      </SC.Topic>
    </Link>
  );
};

export default compose<FC<ExternalProps>>(memo)(Topic);
