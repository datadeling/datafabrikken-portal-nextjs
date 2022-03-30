import React, { FC, memo } from 'react';

import SC from './styled';
import Root from '../root';
import Markdown from '../markdown';
import ArticleSC from '../article/styled';
import { Variant as ContainerVariant } from '../container';
import { FancyArticle } from '../../services/api/generated/cms/graphql';
import { isBasicParagraph } from '../../utils/strapi';

interface Props {
  article: FancyArticle;
}

export const ArticlePageStrapi: FC<Props> = ({
  article: { title, subtitle, content }
}) => (
  <Root invertColor>
    <SC.Header>
      <SC.Container $variant={ContainerVariant.WIDTH_720}>
        <SC.Title>{title}</SC.Title>
        <SC.Subtitle>{subtitle}</SC.Subtitle>
      </SC.Container>
    </SC.Header>
    <SC.ContentSection>
      {content?.map(
        paragraph =>
          isBasicParagraph(paragraph) && (
            <SC.ParagraphBackground>
              <SC.Container $variant={ContainerVariant.WIDTH_720}>
                <ArticleSC.Body>
                  <Markdown>{paragraph?.content ?? ''}</Markdown>
                </ArticleSC.Body>
              </SC.Container>
            </SC.ParagraphBackground>
          )
      )}
    </SC.ContentSection>
  </Root>
);

export default memo(ArticlePageStrapi);
