import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from './styled';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import Root from '../../components/root';
import CourseCard from '../../components/info-card';

import {
  Provider,
  GetCoursesDocument,
  Course,
  FancyArticle
} from '../../services/api/generated/cms/graphql';
import { isBasicParagraph, isProvider } from '../../utils/strapi';
import Breadcrumbs from '../../components/breadcrumbs';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import Head from 'next/head';

export async function getStaticProps() {
  const sixHoursInSeconds = 21600;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GetCoursesDocument
  });

  return {
    props: {
      ...data
    },
    revalidate: sixHoursInSeconds
  };
}

interface Props {
  courses?: Course[];
  providers?: Provider[];
  topArticle?: FancyArticle;
}

const CoursesPage: FC<Props> = ({ courses, providers, topArticle }) => {
  const pageTitle = topArticle?.title ?? null;
  const pageDescription = isBasicParagraph(topArticle?.content?.[0])
    ? topArticle?.content?.[0].content ?? null
    : null;

  const providersById =
    providers?.reduce(
      (previous, provider) =>
        isProvider(provider)
          ? {
              ...previous,
              [provider.id]: provider
            }
          : previous,
      {} as Record<string, Provider>
    ) ?? {};

  return (
    <>
      {pageTitle && pageDescription && (
        <Head>
          <title>{pageTitle}</title>
          <meta property='og:title' content={pageTitle} />

          <meta name='description' content={pageDescription} />
          <meta name='og:description' content={pageDescription} />
        </Head>
      )}
      <Breadcrumbs />
      <Root>
        <SC.Header>
          <SC.Container>
            <SC.Title>{topArticle?.title}</SC.Title>
            <SC.Subtitle>
              {isBasicParagraph(topArticle?.content?.[0]) &&
                topArticle?.content?.[0].content}
            </SC.Subtitle>
          </SC.Container>
        </SC.Header>
        <SC.CourseSection>
          <SC.Container>
            <SC.CourseCardContainer>
              {courses?.map((course, index) => (
                <CourseCard
                  key={`course-${index}`}
                  infoObject={course}
                  provider={
                    course?.providerId && providersById[course.providerId]
                  }
                />
              ))}
            </SC.CourseCardContainer>
          </SC.Container>
        </SC.CourseSection>
      </Root>
    </>
  );
};

export default compose<FC>(memo, withErrorBoundary(ErrorPage))(CoursesPage);
