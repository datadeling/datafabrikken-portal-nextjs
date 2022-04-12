import React, { FC } from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { PATHNAME } from '../../types/enums';
import { getCmsPage } from '../../services/api/cms-api/news';
import Root from '../../components/root';
import Article from '../../components/article';
import Breadcrumbs from '../../components/breadcrumbs';

const articleIds: { [pathname: string]: { [key: string]: string } } = {
  [`${PATHNAME.FIND_DATA}${PATHNAME.DATA_SOURCES}`]: {
    nb: 'e15dd9b8-4bde-49d8-90a1-2a2ca372e37b'
  },
  [`${PATHNAME.FIND_DATA}${PATHNAME.DATA_SOURCES}${PATHNAME.PRIVATE_SECTOR}`]: {
    nb: '8cefd2fa-f653-49f7-bbc1-50b76829f830'
  },
  [`${PATHNAME.FIND_DATA}${PATHNAME.GUIDEANCE_AND_COMPETENCE}`]: {
    nb: '7333da4c-2ffe-46b0-acf3-7452949ebae6'
  },
  [`${PATHNAME.FIND_DATA}${PATHNAME.GUIDEANCE_AND_COMPETENCE}${PATHNAME.LEGAL_FRAMEWORK}`]:
    {
      nb: '888b5157-8822-4e18-9076-e48f7c6ad19c'
    }
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const fiveMinutesInSeconds = 300;
  const path =
    params?.path && params?.path instanceof Array ? params?.path : [];
  const articleId = articleIds[`${PATHNAME.FIND_DATA}/${path.join('/')}`]?.nb;
  const cmsPage = await getCmsPage(articleId);

  return {
    props: {
      cmsPage
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

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

const ArticlePage: FC<Props> = ({ cmsPage }) => (
  <>
    <Breadcrumbs dynamicPageTitles={[cmsPage?.title ?? '']} />
    <Root invertColor>{cmsPage && <Article article={cmsPage} />}</Root>
  </>
);

export default ArticlePage;
