import React, { FC } from 'react';
import { GetStaticPropsContext } from 'next';

import { PATHNAME } from '../../types/enums';
import Breadcrumbs from '../../components/breadcrumbs';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import {
  FancyArticle,
  GetFancyArticleDocument
} from '../../services/api/generated/cms/graphql';
import ArticleStrapi from '../../components/article-strapi';

export const articleIds: { [pathname: string]: string } = {
  [`${PATHNAME.GUIDANCE}/tilby-data`]: '7',
  [`${PATHNAME.GUIDANCE}/bruke-data`]: '9'
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();
  const articleId = articleIds[`${PATHNAME.GUIDANCE}/${params?.articleId}`];

  const { data } = await apolloClient.query({
    query: GetFancyArticleDocument,
    variables: {
      id: articleId
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
  return {
    paths: Object.keys(articleIds),
    fallback: false
  };
}

interface Props {
  fancyArticle?: FancyArticle;
}

const ArticlePage: FC<Props> = ({ fancyArticle }) => (
  <>
    <Breadcrumbs dynamicPageTitles={[fancyArticle?.title ?? '']} />
    {fancyArticle && <ArticleStrapi article={fancyArticle} />}
  </>
);

export default ArticlePage;
