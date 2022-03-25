import React, { FC, memo } from 'react';
import Link from 'next/link';

import Markdown from '../../../markdown';
import { ComponentBasicInfobox } from '../../../../services/api/generated/cms/graphql';
import { isAbsoluteUrl } from '../../../../utils/string-helper';

import InfoBox from '../info-box';
import InfoBoxIcon from '../info-box-icon';
import InfoBoxTitle from '../info-box-title';
import InfoBoxBody from '../info-box-body';
import InfoBoxImage from '../info-box-image';
import env from '../../../../env';

interface Props {
  infoBox: ComponentBasicInfobox;
  invertColor?: boolean;
}

const ResolveInfoboxUrl = (url?: string) => {
  if (!url) {
    return undefined;
  }
  return isAbsoluteUrl(url)
    ? { as: Link, href: url, target: '_blank' }
    : { as: Link, href: url };
};

const InfoBoxStrapi: FC<Props> = ({
  infoBox: { id, link, title, content, illustration, hoverIllustration },
  invertColor
}) => (
  <InfoBox
    key={id}
    {...ResolveInfoboxUrl(link ?? '')}
    invertColor={invertColor}
  >
    <a>
      <InfoBoxIcon>
        {illustration?.url && (
          <InfoBoxImage
            src={`${env.STRAPI_API_HOST}${illustration.url}`}
            alt={illustration.alternativeText ?? `${id}-illustration`}
            hoverSrc={
              hoverIllustration?.url &&
              `${env.STRAPI_API_HOST}${hoverIllustration.url}`
            }
            hoverAlt={
              hoverIllustration?.alternativeText ?? `${id}-illustration`
            }
          />
        )}
      </InfoBoxIcon>
      <InfoBoxTitle invertColor={invertColor}>
        <h3>{title}</h3>
      </InfoBoxTitle>
      {content && (
        <InfoBoxBody truncate={false}>
          <Markdown allowHtml>{content}</Markdown>
        </InfoBoxBody>
      )}
    </a>
  </InfoBox>
);

export default memo(InfoBoxStrapi);
