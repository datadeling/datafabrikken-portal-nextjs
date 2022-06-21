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
import SC from '../../styles/pages/nyheter';
import { PAGE_PROPERTY, PATHNAME } from '../../types/enums';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import {
  GetNewsArticlesDocument,
  NewsArticle
} from '../../services/api/generated/cms/graphql';
import env from '../../../env';

import Breadcrumbs from '../../components/breadcrumbs';
import translations from '../../services/translations';
import Head from '../../components/head';

const { STRAPI_API_HOST } = env.clientEnv;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();

  const { data }: { data: NewsArticle[] } = await apolloClient.query({
    query: GetNewsArticlesDocument,
    variables: {
      limit: PAGE_PROPERTY.NEWS_LIMIT
    }
  });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

interface Props {
  newsArticles: NewsArticle[];
}

const NewsPage: FC<Props> = ({ newsArticles }) => (
  <>
    <Head title={translations.translate('news.title') as string} />
    <Breadcrumbs />
    <Root>
      <Container>
        <SC.Page>
          <SC.Title>
            <Translation id='news.title' />
          </SC.Title>
          <SC.Content>
            {newsArticles?.map(
              ({
                id,
                slug,
                published,
                published_at,
                title,
                subtitle,
                socialImage
              }) => (
                <InfoBox key={id} href={`${PATHNAME.NEWS}/${slug}-${id}`}>
                  {socialImage && (
                    <InfoBoxImage
                      src={`${STRAPI_API_HOST}${socialImage.url}`}
                      alt={socialImage.alternativeText ?? ''}
                    />
                  )}
                  <InfoBoxSC.InfoBox.Date>
                    {published && formatDate(dateStringToDate(published))}
                    {!published && formatDate(dateStringToDate(published_at))}
                  </InfoBoxSC.InfoBox.Date>
                  <InfoBoxTitle>
                    <h4>{title}</h4>
                  </InfoBoxTitle>
                  <InfoBoxBody>{subtitle}</InfoBoxBody>
                </InfoBox>
              )
            )}
          </SC.Content>
        </SC.Page>
      </Container>
    </Root>
  </>
);

export default compose<FC>(memo)(NewsPage);
