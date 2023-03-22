import React, { FC, memo } from 'react';
import { compose } from 'redux';
import SC from './styled';
import env from '../../../env';
import RoundedTag, { Variant } from '../rounded-tag';
import Translation from '../translation';
import ExternalLinkIcon from '../icons/external-link-icon';
import translations from '../../services/translations';
import {
  CourseEntity,
  GuideEntity,
  ProviderEntity
} from '../../services/api/generated/cms/graphql';

const { STRAPI_API_HOST } = env.clientEnv;

interface ExternalProps {
  infoObject: CourseEntity | GuideEntity;
  provider?: ProviderEntity | undefined | null;
}

interface Props extends ExternalProps {}

const InfoCard: FC<Props> = ({ infoObject, provider }) => (
  <SC.Card href={infoObject.attributes?.link} target='_blank'>
    {infoObject.attributes?.featureImage?.data?.attributes?.url && (
      <SC.Image
        src={`${STRAPI_API_HOST}${infoObject.attributes?.featureImage?.data?.attributes?.url}`}
      />
    )}
    <SC.CourseContent>
      <SC.Tags>
        {infoObject.__typename === 'CourseEntity' &&
          (infoObject as CourseEntity).attributes?.courseType && (
            <RoundedTag as='div'>
              <span>
                {translations.translate(
                  `infoCard.${infoObject.attributes?.courseType}`
                )}
              </span>
            </RoundedTag>
          )}
        {infoObject.__typename === 'CourseEntity' &&
          (infoObject as CourseEntity).attributes?.free && (
            <RoundedTag as='div' variant={Variant.SECONDARY}>
              <span>
                <Translation id='infoCard.free' />
              </span>
            </RoundedTag>
          )}
      </SC.Tags>
      <h4>
        {infoObject.attributes?.title}
        <ExternalLinkIcon />
      </h4>
      <p>{infoObject.attributes?.description}</p>
      <SC.CourseFacts>
        {infoObject.attributes?.durationInMinutes && (
          <SC.Fact
            title={`${
              infoObject.attributes?.durationInMinutes
            } ${translations.translate('infoCard.minutes')}`}
          >
            <SC.ClockIcon />
            {`${
              infoObject.attributes?.durationInMinutes
            } ${translations.translate('infoCard.minutes')} ${
              infoObject.__typename === 'GuideEntity' &&
              (infoObject as GuideEntity).attributes?.contentType
                ? translations.translate(
                    `infoCard.contentType.${infoObject.attributes?.contentType}`
                  )
                : ''
            }`}
          </SC.Fact>
        )}
        {infoObject.__typename === 'CourseEntity' &&
          (infoObject as CourseEntity).attributes?.numberOfModules && (
            <SC.Fact
              title={`${
                infoObject.attributes?.numberOfModules
              } ${translations.translate('infoCard.modules')}`}
            >
              <SC.BoxIcon />
              {`${
                infoObject.attributes?.numberOfModules
              } ${translations.translate('infoCard.modules')}`}
            </SC.Fact>
          )}
      </SC.CourseFacts>
    </SC.CourseContent>
    {provider?.attributes?.logo?.data?.attributes?.url && (
      <SC.CourseProvider>
        <SC.ProviderLogo
          src={`${STRAPI_API_HOST}${provider.attributes?.logo?.data?.attributes?.url}`}
          alt={
            provider.attributes?.logo?.data?.attributes?.alternativeText ||
            `${translations.translate('infoCard.providerLogo')}`
          }
        />
        {`${translations.translate('infoCard.providerText')} ${
          provider.attributes?.title
        }`}
      </SC.CourseProvider>
    )}
  </SC.Card>
);

export default compose<FC<ExternalProps>>(memo)(InfoCard);
