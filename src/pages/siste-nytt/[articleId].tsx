import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PAGE_PROPERTY, PATHNAME } from '../../types/enums';
import Root from '../../components/root';
import env from '../../../env';
import Breadcrumbs from '../../components/breadcrumbs';
import Head from '../../components/head';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import {
  GetNewsArticleDocument,
  GetNewsArticlesDocument,
  NewsArticle
} from '../../services/api/generated/cms/graphql';
import ArticleStrapi from '../../components/article-strapi';

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();

  const articleId = Array.isArray(params?.articleId)
    ? (params?.articleId as string[]).join()
    : params?.articleId;

  const { data }: { data: { newsArticle: NewsArticle } } =
    await apolloClient.query({
      query: GetNewsArticleDocument,
      variables: {
        id: articleId?.split('-').pop()
      }
    });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const { data }: { data: { newsArticles: NewsArticle[] } } =
    await apolloClient.query({
      query: GetNewsArticlesDocument,
      variables: {
        limit: PAGE_PROPERTY.NEWS_LIMIT
      }
    });

  return {
    paths: data?.newsArticles?.map(
      ({ id, slug }) => `${PATHNAME.NEWS}/${slug}-${id}`
    ),
    fallback: true
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

const { STRAPI_API_HOST } = env.clientEnv;

const ArticlePage: FC<Props> = ({ newsArticle }) => (
  <>
    <Head
      title={newsArticle?.title ?? ''}
      description={newsArticle?.subtitle ?? ''}
      previewImageSrc={`${STRAPI_API_HOST}${newsArticle?.socialImage?.url}`}
    />
    <Breadcrumbs dynamicPageTitles={[newsArticle?.title ?? '']} />
    <Root invertColor hideScrollToTop>
      {newsArticle && <ArticleStrapi article={newsArticle} />}
    </Root>
  </>
);
export default ArticlePage;
