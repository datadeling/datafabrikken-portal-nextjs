import React, { FC, memo } from 'react';

import Markdown from '../../../markdown';
import { ComponentBasicInfobox } from '../../../../services/api/generated/cms/graphql';

import InfoBox from '../info-box';
import InfoBoxIcon from '../info-box-icon';
import InfoBoxTitle from '../info-box-title';
import InfoBoxBody from '../info-box-body';
import InfoBoxImage from '../info-box-image';
import env from '../../../../../env';

const { STRAPI_API_HOST } = env.clientEnv;

interface Props {
  infoBox: ComponentBasicInfobox;
  invertColor?: boolean;
}

const InfoBoxStrapi: FC<Props> = ({
  infoBox: { id, link, title, content, illustration, hoverIllustration },
  invertColor
}) => (
  <InfoBox key={id} href={link ?? ''} invertColor={invertColor}>
    <InfoBoxIcon>
      {illustration?.data?.attributes?.url && (
        <InfoBoxImage
          src={`${STRAPI_API_HOST}${illustration.data?.attributes?.url}`}
          alt={
            illustration.data?.attributes?.alternativeText ??
            `${id}-illustration`
          }
          hoverSrc={
            hoverIllustration?.data?.attributes?.url &&
            `${STRAPI_API_HOST}${hoverIllustration.data.attributes.url}`
          }
          hoverAlt={
            hoverIllustration?.data?.attributes?.alternativeText ??
            `${id}-illustration`
          }
        />
      )}
    </InfoBoxIcon>
    <InfoBoxTitle invertColor={invertColor}>
      <h4>{title}</h4>
    </InfoBoxTitle>
    {content && (
      <InfoBoxBody truncate={false}>
        <Markdown allowHtml>{content}</Markdown>
      </InfoBoxBody>
    )}
  </InfoBox>
);

export default memo(InfoBoxStrapi);
