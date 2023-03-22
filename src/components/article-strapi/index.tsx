import React, { FC, memo } from 'react';

import SC from './styled';
import Markdown from '../markdown';
import { Variant as ContainerVariant } from '../container';
import {
  Enum_Componentbasicfactbox_Variant,
  NewsArticleEntity
} from '../../services/api/generated/cms/graphql';
import {
  isBasicParagraph,
  isBasicImage,
  isBasicInfoBox,
  isBasicFactBox,
  isBasicFactBoxVariant
} from '../../utils/strapi';
import {
  InfoBox,
  InfoBoxBody,
  InfoBoxIcon,
  InfoBoxImage,
  InfoBoxTitle
} from '../info-box';
import { FactBox, FactBoxTitle, FactBoxBody } from '../fact-box';
import { isAbsoluteUrl } from '../../utils/string-helper';
import env from '../../../env';
import { dateStringToDate, formatDate } from '../../utils/date';
import ScrollToTop from '../scroll-to-top';

interface Props {
  article?: any;
  showScrollToTop?: boolean;
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

export const ArticlePageStrapi: FC<Props> = ({
  article,
  showScrollToTop = true
}) => {
  const { title, subtitle, content } = article?.attributes ?? {};

  const publishedDate = () => {
    if (article?.__typename === 'NewsArticleEntity') {
      const newsArticle = article as NewsArticleEntity;
      const published =
        newsArticle?.attributes?.published ??
        newsArticle?.attributes?.publishedAt;
      return published ? (
        <SC.Published>{formatDate(dateStringToDate(published))}</SC.Published>
      ) : null;
    }
    return null;
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
          (component: any, index: number) =>
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
                      alt={`${component?.media?.data?.attributes?.alternativeText}`}
                      src={`${STRAPI_API_HOST}${component?.media?.data?.attributes?.url}`}
                    />
                    {component?.media?.data?.attributes?.caption && (
                      <SC.ImageText>
                        {component?.media?.data?.attributes?.caption}
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
                          src={`${STRAPI_API_HOST}${component?.illustration?.data?.attributes?.url}`}
                          alt={
                            component?.illustration?.data?.attributes
                              ?.alternativeText ??
                            `${component?.id}-illustration`
                          }
                          hoverSrc={
                            component?.hoverIllustration?.data?.attributes
                              ?.url &&
                            `${STRAPI_API_HOST}${component.hoverIllustration.data.attributes.url}`
                          }
                          hoverAlt={
                            component?.hoverIllustration?.data?.attributes
                              ?.alternativeText ??
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
            )) ||
            (isBasicFactBox(component) && (
              <SC.Container
                $variant={
                  isBasicFactBoxVariant(
                    Enum_Componentbasicfactbox_Variant.Normal,
                    component
                  )
                    ? ContainerVariant.WIDTH_720
                    : undefined
                }
              >
                <SC.FactBoxWrapper
                  $small={
                    isBasicFactBoxVariant(
                      Enum_Componentbasicfactbox_Variant.Liten,
                      component
                    )
                      ? true
                      : false
                  }
                >
                  <FactBox>
                    <FactBoxTitle>{component?.title}</FactBoxTitle>
                    <FactBoxBody truncate={false}>
                      <Markdown allowHtml>{component?.content ?? ''}</Markdown>
                    </FactBoxBody>
                  </FactBox>
                </SC.FactBoxWrapper>
              </SC.Container>
            ))
        )}
      </SC.ContentSection>
      {showScrollToTop ?? (
        <ScrollToTop
          invertColor
          alternativeBackgroundColor={hasAlternativeBackgroundColor(
            content?.[content?.length - 1]
          )}
        />
      )}
    </SC.Root>
  );
};

export default memo(ArticlePageStrapi);
