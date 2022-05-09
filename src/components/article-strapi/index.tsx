import React, { FC, memo } from 'react';

import SC from './styled';
import Markdown from '../markdown';
import { Variant as ContainerVariant } from '../container';
import {
  FancyArticle,
  NewsArticle
} from '../../services/api/generated/cms/graphql';
import {
  isBasicParagraph,
  isBasicImage,
  isBasicInfoBox
} from '../../utils/strapi';
import {
  InfoBox,
  InfoBoxBody,
  InfoBoxIcon,
  InfoBoxImage,
  InfoBoxTitle
} from '../info-box';
import { isAbsoluteUrl } from '../../utils/string-helper';
import env from '../../../env';
import { dateStringToDate, formatDate } from '../../utils/date';
import ScrollToTop from '../scroll-to-top';

interface Props {
  article: FancyArticle | NewsArticle;
}

const { STRAPI_API_HOST } = env.clientEnv;

const hasAlternativeBackgroundColor = (component: any) => {
  if (
    isBasicParagraph(component) ||
    isBasicImage(component) ||
    isBasicInfoBox(component)
  ) {
    return !!component.alternativeBackgroundColor;
  }

  return false;
};

export const ArticlePageStrapi: FC<Props> = ({ article }) => {
  const { title, subtitle, content } = article;

  const publishedDate = () => {
    const newsArticle = article as NewsArticle;
    const published = newsArticle?.published ?? newsArticle?.published_at;
    return published ? (
      <SC.Published>{formatDate(dateStringToDate(published))}</SC.Published>
    ) : null;
  };

  return (
    <SC.Root>
      <SC.HeaderSection $showFeaturedImage={isBasicImage(content?.[0])}>
        <SC.Container $variant={ContainerVariant.WIDTH_990}>
          <SC.Title>{title}</SC.Title>
          <SC.Subtitle>{subtitle}</SC.Subtitle>
          {publishedDate()}
        </SC.Container>
      </SC.HeaderSection>
      <SC.ContentSection>
        {content?.map(
          (component, index) =>
            (isBasicParagraph(component) && (
              <SC.Background
                $altColor={hasAlternativeBackgroundColor(component)}
              >
                <SC.Container $variant={ContainerVariant.WIDTH_720}>
                  <SC.Body>
                    <Markdown allowHtml>{component?.content ?? ''}</Markdown>
                  </SC.Body>
                </SC.Container>
              </SC.Background>
            )) ||
            (isBasicImage(component) && (
              <SC.Background
                $showFeaturedImage={index == 0}
                $altColor={
                  hasAlternativeBackgroundColor(component) && index > 0
                }
              >
                <SC.Container
                  $variant={
                    index == 0
                      ? ContainerVariant.WIDTH_990
                      : ContainerVariant.WIDTH_720
                  }
                >
                  <SC.ImageWrapper key={component?.id}>
                    <SC.Image
                      alt={`${component?.media?.[0]?.alternativeText}`}
                      src={`${STRAPI_API_HOST}${component?.media?.[0]?.url}`}
                    />
                    {component?.media?.[0]?.caption && (
                      <SC.ImageText>
                        {component?.media?.[0]?.caption}
                      </SC.ImageText>
                    )}
                  </SC.ImageWrapper>
                </SC.Container>
              </SC.Background>
            )) ||
            (isBasicInfoBox(component) && (
              <SC.Background
                $altColor={hasAlternativeBackgroundColor(component)}
              >
                <SC.Container $variant={ContainerVariant.WIDTH_720}>
                  <SC.InfoBoxWrapper key={component?.id}>
                    <InfoBox
                      {...(isAbsoluteUrl(component?.link ?? '')
                        ? {
                            href: component?.link ?? '',
                            target: '_blank',
                            externalLink: true
                          }
                        : { href: component?.link ?? '' })}
                      invertColor
                    >
                      <InfoBoxIcon>
                        <InfoBoxImage
                          src={`${STRAPI_API_HOST}${component?.illustration?.url}`}
                          alt={
                            component?.illustration?.alternativeText ??
                            `${component?.id}-illustration`
                          }
                          hoverSrc={
                            component?.hoverIllustration?.url &&
                            `${STRAPI_API_HOST}${component.hoverIllustration.url}`
                          }
                          hoverAlt={
                            component?.hoverIllustration?.alternativeText ??
                            `${component?.id}-illustration`
                          }
                        />
                      </InfoBoxIcon>
                      <InfoBoxTitle invertColor>
                        {component?.title}
                      </InfoBoxTitle>
                      <InfoBoxBody truncate={false}>
                        <Markdown allowHtml>
                          {component?.content ?? ''}
                        </Markdown>
                      </InfoBoxBody>
                    </InfoBox>
                  </SC.InfoBoxWrapper>
                </SC.Container>
              </SC.Background>
            ))
        )}
      </SC.ContentSection>
      <ScrollToTop
        invertColor
        alternativeBackgroundColor={hasAlternativeBackgroundColor(
          content?.[content?.length - 1]
        )}
      />
    </SC.Root>
  );
};

export default memo(ArticlePageStrapi);
