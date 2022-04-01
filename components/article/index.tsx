import React, { FC, memo } from 'react';

import {
  getParagraphBodyProcessed,
  getParagraphBodyValue,
  getParagraphImage
} from '../../utils/drupal-values';

import { Variant as ContainerVariant } from '../container';
import { InfoBox, InfoBoxIcon, InfoBoxBody, InfoBoxTitle } from '../info-box';
import Markdown from '../markdown';

import SC from './styled';

import SearchForDataIllustration from '../../public/images/illustration-search-for-data.inline.svg';
import ContactIllustration from '../../public/images/illustration-contact.inline.svg';
import CommunityIllustration from '../../public/images/illustration-community.inline.svg';
import CourseIllustration from '../../public/images/illustration-course.inline.svg';
import type { CmsArticle } from '../../types';
import { PARAGRAPH } from '../../types/enums';
import Head from '../head';

interface Props {
  article: Partial<CmsArticle>;
}

export const renderModule = (module: any) => {
  switch (module.type) {
    case PARAGRAPH.BODY:
      return (
        <SC.Body key={module.id}>
          <Markdown allowHtml>{getParagraphBodyValue(module)}</Markdown>
        </SC.Body>
      );
    case PARAGRAPH.QUOTE:
      return (
        <SC.Quote key={module.id}>
          <Markdown allowHtml>{getParagraphBodyProcessed(module)}</Markdown>
        </SC.Quote>
      );
    case PARAGRAPH.IMAGE: {
      const image = getParagraphImage(module);
      return (
        <SC.ImageWrapper key={module.id}>
          <SC.Image
            alt={image?.meta?.alt}
            src={image?.download_urls?.canonical}
          />
          <SC.ImageText>{module.field_image?.field_ingress}</SC.ImageText>
        </SC.ImageWrapper>
      );
    }
    case PARAGRAPH.INFO_BOX: {
      const infoBoxUrl = module?.field_link?.uri?.replace('internal:', '');
      const r = new RegExp('^(?:[a-z]+:)?//', 'i');
      const isAbsoluteUrl = r.test(infoBoxUrl) ?? false;

      const renderInfoBoxIcon = () => {
        if (infoBoxUrl?.includes('finn-data')) {
          return (
            <InfoBoxIcon>
              <SearchForDataIllustration />
            </InfoBoxIcon>
          );
        }
        if (infoBoxUrl?.includes('kontakt')) {
          return (
            <InfoBoxIcon>
              <ContactIllustration />
            </InfoBoxIcon>
          );
        }
        if (infoBoxUrl?.includes('kurs')) {
          return (
            <InfoBoxIcon>
              <CourseIllustration />
            </InfoBoxIcon>
          );
        }
        if (infoBoxUrl?.includes('datalandsbyen')) {
          return (
            <InfoBoxIcon>
              <CommunityIllustration />
            </InfoBoxIcon>
          );
        }

        return null;
      };

      return (
        <SC.InfoBoxWrapper key={module.id}>
          <InfoBox
            {...(isAbsoluteUrl
              ? {
                  href: module.field_link?.uri,
                  target: '_blank',
                  externalLink: true
                }
              : { href: infoBoxUrl })}
            invertColor
          >
            {renderInfoBoxIcon()}
            <InfoBoxTitle invertColor>{module.field_link?.title}</InfoBoxTitle>
            <InfoBoxBody truncate={false}>
              <Markdown allowHtml>{module.field_body?.processed}</Markdown>
            </InfoBoxBody>
          </InfoBox>
        </SC.InfoBoxWrapper>
      );
    }
    default:
      return null;
  }
};

const Article: FC<Props> = ({ article }) => {
  const title = article?.title;
  const ingress = article?.field_ingress;
  const modules = article?.field_modules;
  const thumbnailSrc =
    article?.field_image_some?.thumbnail?.download_urls?.canonical;

  return (
    <SC.Article>
      <Head
        title={title}
        description={ingress}
        previewImageSrc={thumbnailSrc}
      />
      <SC.Header>
        <SC.Container $variant={ContainerVariant.WIDTH_720}>
          <SC.Title>{title}</SC.Title>
          {ingress && (
            <SC.Ingress>
              <Markdown allowHtml>{ingress}</Markdown>
            </SC.Ingress>
          )}
        </SC.Container>
      </SC.Header>
      <SC.Container $variant={ContainerVariant.WIDTH_720}>
        {modules?.map((module: any) => renderModule(module))}
      </SC.Container>
    </SC.Article>
  );
};

export default memo(Article);
