import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PAGE_PROPERTY, PATHNAME } from '../../types/enums';
import { getCmsPage, getNews } from '../../services/api/cms-api/news';
import Root from '../../components/root';
import Article from '../../components/article';
import Breadcrumbs from '../../components/breadcrumbs';
import Head from 'next/head';

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

const ArticlePage: FC<Props> = ({ cmsPage }) => {
  const title = cmsPage?.title;
  const ingress = cmsPage?.field_ingress;
  const thumbnailSrc =
    cmsPage?.field_image_some?.thumbnail?.download_urls?.canonical;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='description' content={ingress} />
        <meta name='og:description' content={ingress} />
        {thumbnailSrc && <meta property='og:image' content={thumbnailSrc} />}
      </Head>
      <Breadcrumbs dynamicPageTitles={[cmsPage?.title ?? '']} />
      <Root invertColor>{cmsPage && <Article article={cmsPage} />}</Root>
    </>
  );
};

export default ArticlePage;
