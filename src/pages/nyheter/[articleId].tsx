import React, { FC } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import Root from '../../components/root';
import env from '../../../env';
import { PATHNAME } from '../../types/enums';
import Breadcrumbs from '../../components/breadcrumbs';
import Head from '../../components/head';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import {
  GetNewsArticleDocument,
  GetNewsArticleQueryResult,
  NewsArticleEntityResponse
} from '../../services/api/generated/cms/graphql';
import ArticleStrapi from '../../components/article-strapi';

const DRUPAL_ARTICLE_MAPPING: {
  [key: string]: number;
} = {
  '8d2cd883-53fa-457b-882c-e1f63d8ece0b': 13,
  '82e96caf-c23e-4581-b166-1127a4fff7d3': 12,
  '4d4a8516-959e-4c9a-885f-5054b46f7657': 11,
  '4a03dbf6-d455-410e-8052-deef1eff137b': 10,
  '99de4de4-4fe2-44b5-a482-aae5e75068be': 9,
  '310212c3-cddb-4329-9af9-fa133fc9f11a': 8,
  'b266c1e5-1b8a-4c99-b653-dce2cf3e1e5b': 7,
  '076c5b6f-f25c-47da-b42b-f93fe37e7ae8': 6,
  '45f1e5b8-bbc1-47f2-8488-61c81f1aa5f9': 5,
  'c819f70f-228e-4732-b5a9-d2a8fad4061c': 4,
  '241d01c2-171f-4814-a91e-88db8afc21d7': 3,
  '79be8a0b-c590-40de-a77e-3e27a263706b': 1
};

export async function getServerSideProps({
  params
}: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();

  const articleId: string = Array.isArray(params?.articleId)
    ? (params?.articleId as string[]).join()
    : params?.articleId ?? '';

  // If articleId matches Drupal article, do a permanent redirect
  if (articleId in DRUPAL_ARTICLE_MAPPING) {
    return {
      redirect: {
        permanent: true,
        destination: `${PATHNAME.NEWS}/${DRUPAL_ARTICLE_MAPPING[articleId]}`
      }
    };
  }

  const { data }: GetNewsArticleQueryResult = await apolloClient.query({
    query: GetNewsArticleDocument,
    variables: {
      id: articleId?.split('-').pop()
    }
  });

  const slug = articleId?.split('-').slice(0, -1).join('-');

  // If slug does not match news article slug, do a permanent redirect (SEO)
  if (
    data?.newsArticle?.data?.attributes?.slug &&
    slug !== data.newsArticle.data.attributes.slug
  ) {
    return {
      redirect: {
        permanent: true,
        destination: `${PATHNAME.NEWS}/${data.newsArticle.data.attributes.slug}-${data.newsArticle.data.id}`
      }
    };
  }

  return {
    props: {
      ...data
    }
  };
}

interface Props extends InferGetServerSidePropsType<typeof getServerSideProps> {
  newsArticle: NewsArticleEntityResponse;
}

const { STRAPI_API_HOST } = env.clientEnv;

const ArticlePage: FC<Props> = ({ newsArticle }) => (
  <>
    <Head
      title={newsArticle?.data?.attributes?.title ?? ''}
      description={newsArticle?.data?.attributes?.subtitle ?? ''}
      previewImageSrc={`${STRAPI_API_HOST}${newsArticle?.data?.attributes?.socialImage?.data?.attributes?.url}`}
    />
    <Breadcrumbs
      dynamicPageTitles={[newsArticle?.data?.attributes?.title ?? '']}
    />
    <Root invertColor hideScrollToTop>
      {newsArticle && <ArticleStrapi article={newsArticle.data} />}
    </Root>
  </>
);
export default ArticlePage;
