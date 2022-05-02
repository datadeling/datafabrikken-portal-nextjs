import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PATHNAME } from '../types/enums';
import { getCmsPage } from '../services/api/cms-api/news';
import Root from '../components/root';
import Article from '../components/article';
import Breadcrumbs from '../components/breadcrumbs';

const articleIds: { [pathname: string]: { [key: string]: string } } = {
  [PATHNAME.ABOUT]: {
    nb: '3ea2ac29-08ba-467f-8ae5-31343cbe9a48'
  }
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const articleId = articleIds[`/${params?.articleId}`]?.nb;
  const cmsPage = await getCmsPage(articleId);

  return {
    props: {
      cmsPage
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

const ArticlePage: FC<Props> = ({ cmsPage }) => (
  <>
    <Breadcrumbs dynamicPageTitles={[cmsPage?.title ?? '']} />
    <Root invertColor>{cmsPage && <Article article={cmsPage} />}</Root>
  </>
);

export default ArticlePage;
