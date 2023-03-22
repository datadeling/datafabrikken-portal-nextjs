import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PATHNAME } from '../types/enums';
import Root from '../components/root';
import Breadcrumbs from '../components/breadcrumbs';
import { initializeApollo } from '../utils/apollo/apolloClient';
import {
  GetFancyArticleDocument,
  GetFancyArticleQueryResult
} from '../services/api/generated/cms/graphql';
import ArticleStrapi from '../components/article-strapi';
import Head from '../components/head';

const articleIds: { [pathname: string]: number } = {
  [`${PATHNAME.HOW_TO_OFFER_DATA}`]: 7,
  [`${PATHNAME.USE_DATA}`]: 9,
  [`${PATHNAME.ABOUT}`]: 11,
  [`${PATHNAME.COMMUNITY_ABOUT}`]: 13
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const path = params?.path instanceof Array ? params?.path : [params?.path];
  const articleId = articleIds[`/${path.join('/')}`];

  const apolloClient = initializeApollo();
  const { data }: GetFancyArticleQueryResult = await apolloClient.query({
    query: GetFancyArticleDocument,
    variables: {
      id: articleId
    }
  });

  return {
    props: {
      ...data
    }
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(articleIds),
    fallback: false
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

const ArticlePage: FC<Props> = ({ fancyArticle }) => (
  <>
    <Head
      title={fancyArticle?.data?.attributes?.title ?? ''}
      description={fancyArticle?.data?.attributes?.subtitle ?? ''}
    />
    <Breadcrumbs
      dynamicPageTitles={[fancyArticle?.data?.attributes?.title ?? '']}
    />
    <Root invertColor hideScrollToTop>
      {fancyArticle && <ArticleStrapi article={fancyArticle?.data} />}
    </Root>
  </>
);

export default ArticlePage;
