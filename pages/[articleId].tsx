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
  },
  [PATHNAME.CONTACT]: {
    nb: '382bcca1-3b63-4a03-9719-bfb1810464e0'
  },
  [PATHNAME.TEXT_FORMAT]: {
    nb: '7983844f-f5fd-41e9-b297-20c4d6e97b13'
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
