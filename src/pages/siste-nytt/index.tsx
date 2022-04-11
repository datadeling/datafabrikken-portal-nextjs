import type { GetServerSidePropsResult } from 'next';
import React, { FC, memo } from 'react';
import { compose } from 'redux';

import { dateStringToDate, formatDate } from '../../utils/date';
import Root from '../../components/root';
import Container from '../../components/container';

import Translation from '../../components/translation';

import {
  InfoBox,
  InfoBoxImage,
  InfoBoxBody,
  InfoBoxTitle,
  SC as InfoBoxSC
} from '../../components/info-box';
import SC from '../../styles/pages/siste-nytt';
import { getNews } from '../../services/api/cms-api/news';
import { PAGE_PROPERTY, PATHNAME } from '../../types/enums';
import type { CmsArticle } from '../../types';

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<Props>
> {
  const cmsNews = await getNews(PAGE_PROPERTY.NEWS_LIMIT);

  return {
    props: {
      cmsNews
    }
  };
}

interface Props {
  cmsNews?: CmsArticle[];
}

const NewsPage: FC<Props> = ({ cmsNews }) => (
  <Root>
    <Container>
      <SC.Page>
        <SC.Title>
          <Translation id='news.title' />
        </SC.Title>
        <SC.Content>
          {cmsNews?.map(
            ({
              id,
              created,
              title,
              field_ingress: ingress,
              field_image_some: image_some
            }) => (
              <InfoBox key={id} href={`${PATHNAME.NEWS}/${id}`}>
                {image_some && (
                  <InfoBoxImage
                    src={image_some.thumbnail.download_urls.canonical}
                    alt={image_some.thumbnail.meta.alt}
                  />
                )}
                <InfoBoxSC.InfoBox.Date>
                  {created && formatDate(dateStringToDate(created))}
                </InfoBoxSC.InfoBox.Date>
                <InfoBoxTitle>
                  <h4>{title}</h4>
                </InfoBoxTitle>
                <InfoBoxBody>{ingress}</InfoBoxBody>
              </InfoBox>
            )
          )}
        </SC.Content>
      </SC.Page>
    </Container>
  </Root>
);

export default compose<FC>(memo)(NewsPage);
