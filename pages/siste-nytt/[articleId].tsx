import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PATHNAME } from '../../types/enums';
import { getCmsPage, getNews } from '../../services/api/cms-api/news';
import Root from '../../components/root';
import Article from '../../components/article';
import Breadcrumbs from '../../components/breadcrumbs';
import { PAGE_PROPERTY } from './enums';

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const cmsPage = await getCmsPage(params?.articleId as string);

  return {
    props: {
      cmsPage
    }
  };
}

export async function getStaticPaths() {
  const pages = await getNews(PAGE_PROPERTY.NEWS_LIMIT);

  return {
    paths: pages?.map(({ id }) => `${PATHNAME.NEWS}/${id}`),
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
