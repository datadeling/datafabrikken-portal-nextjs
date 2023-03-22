import React, { memo, FC } from 'react';
import { compose } from 'redux';

import SC from '../../styles/pages/kurs';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import Root from '../../components/root';
import CourseCard from '../../components/info-card';

import {
  GetCoursesDocument,
  ProviderEntity,
  GetCoursesQueryResult,
  CourseEntityResponseCollection,
  ProviderEntityResponseCollection,
  FancyArticleEntityResponse
} from '../../services/api/generated/cms/graphql';
import { isBasicParagraph, isProvider } from '../../utils/strapi';
import Breadcrumbs from '../../components/breadcrumbs';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import Head from '../../components/head';

export async function getStaticProps() {
  const fiveMinutesInSeconds = 30;
  const apolloClient = initializeApollo();
  const { data }: GetCoursesQueryResult = await apolloClient.query({
    query: GetCoursesDocument
  });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

interface Props {
  courses?: CourseEntityResponseCollection;
  topArticle?: FancyArticleEntityResponse;
  providers?: ProviderEntityResponseCollection;
}

const CoursesPage: FC<Props> = ({ courses, providers, topArticle }) => {
  const pageTitle = topArticle?.data?.attributes?.title ?? undefined;
  const pageDescription = isBasicParagraph(
    topArticle?.data?.attributes?.content?.[0]
  )
    ? topArticle?.data?.attributes?.content?.[0].content ?? undefined
    : undefined;

  const providersById =
    providers?.data?.reduce(
      (previous, provider) =>
        isProvider(provider)
          ? {
              ...previous,
              [`${provider.id}`]: provider
            }
          : previous,
      {} as Record<string, ProviderEntity>
    ) ?? {};

  return (
    <>
      <Head title={pageTitle} description={pageDescription} />
      <Breadcrumbs />
      <Root>
        <SC.Header>
          <SC.Container>
            <SC.Title>{topArticle?.data?.attributes?.title}</SC.Title>
            <SC.Subtitle>
              {isBasicParagraph(topArticle?.data?.attributes?.content?.[0]) &&
                topArticle?.data?.attributes?.content?.[0].content}
            </SC.Subtitle>
          </SC.Container>
        </SC.Header>
        <SC.CourseSection>
          <SC.Container>
            <SC.CourseCardContainer>
              {courses?.data?.map((course, index) => (
                <CourseCard
                  key={`course-${index}`}
                  infoObject={course}
                  provider={providersById[`${course.attributes?.providerId}`]}
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
