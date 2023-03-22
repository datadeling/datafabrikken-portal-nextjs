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
  GetNewsArticlesQueryResult,
  NewsArticleEntityResponseCollection
} from '../../services/api/generated/cms/graphql';
import env from '../../../env';

import Breadcrumbs from '../../components/breadcrumbs';
import translations from '../../services/translations';
import Head from '../../components/head';

const { STRAPI_API_HOST } = env.clientEnv;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();

  const { data }: GetNewsArticlesQueryResult = await apolloClient.query({
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
  newsArticles: NewsArticleEntityResponseCollection;
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
            {newsArticles?.data?.map(({ id, attributes: newsArticle }) => (
              <InfoBox
                key={id}
                href={`${PATHNAME.NEWS}/${newsArticle?.slug}-${id}`}
              >
                {newsArticle?.socialImage && (
                  <InfoBoxImage
                    src={`${STRAPI_API_HOST}${newsArticle?.socialImage?.data?.attributes?.url}`}
                    alt={
                      newsArticle?.socialImage?.data?.attributes
                        ?.alternativeText ?? ''
                    }
                  />
                )}
                <InfoBoxSC.InfoBox.Date>
                  {newsArticle?.published &&
                    formatDate(dateStringToDate(newsArticle?.published))}
                  {!newsArticle?.published &&
                    formatDate(dateStringToDate(newsArticle?.publishedAt))}
                </InfoBoxSC.InfoBox.Date>
                <InfoBoxTitle>
                  <h4>{newsArticle?.title}</h4>
                </InfoBoxTitle>
                <InfoBoxBody>{newsArticle?.subtitle}</InfoBoxBody>
              </InfoBox>
            ))}
          </SC.Content>
        </SC.Page>
      </Container>
    </Root>
  </>
);

export default compose<FC>(memo)(NewsPage);
