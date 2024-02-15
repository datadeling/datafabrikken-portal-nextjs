import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { InferGetStaticPropsType } from 'next';

import Root from '../components/root';
import {
  ContentBox,
  ContentBoxHeader,
  ContextBoxBody,
  SC as ContentBoxSC
} from '../components/content-box';
import {
  InfoBox,
  InfoBoxBody,
  InfoBoxTitle,
  InfoBoxImage,
  SC as InfoBoxSC,
  InfoBoxIcon
} from '../components/info-box';
import Markdown from '../components/markdown';
import Translation from '../components/translation';
import Topic from '../components/community/topic';

import { dateStringToDate, formatDate } from '../utils/date';

import SC from '../styles/pages';

import { getPopularTopics } from '../services/api/community-api/topics';
import {
  searchDatasets,
  extractDatasetsTotal
} from '../services/api/search-fulltext-api/datasets';

import CommunityIllustration from '../../public/images/illustration-community-large.inline.svg';
import CourseIllustration from '../../public/images/illustration-course.inline.svg';
import GuideIllustration from '../../public/images/illustration-guide.inline.svg';
import BoxOfDataIllustration from '../../public/images/illustration-box-of-data.inline.svg';
import translations from '../services/translations';
import Head from '../components/head';
import NewsletterSubscribe from '../components/newsletter-subscribe';
import {
  GetMainArticleAndLatestNewsDocument,
  ComponentBasicInfobox,
  ComponentBasicImage,
  ComponentBasicParagraph,
  GetMainArticleAndLatestNewsQueryResult
} from '../services/api/generated/cms/graphql';
import { initializeApollo } from '../utils/apollo/apolloClient';
import {
  isBasicImage,
  isBasicInfoBox,
  isBasicParagraph
} from '../utils/strapi';
import { PATHNAME } from '../types/enums';
import env from '../../env';
import Link from '../components/link';

const { STRAPI_API_HOST } = env.clientEnv;
const mainArticleId = 15;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const popularCommunityTopics = (await getPopularTopics())?.topics;
  const totalDatasets = extractDatasetsTotal(await searchDatasets({}));

  const apolloClient = initializeApollo();

  const { data }: GetMainArticleAndLatestNewsQueryResult =
    await apolloClient.query({
      query: GetMainArticleAndLatestNewsDocument,
      variables: {
        id: mainArticleId
      }
    });

  return {
    props: {
      ...data,
      popularCommunityTopics,
      totalDatasets
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every revalidate seconds
    revalidate: fiveMinutesInSeconds // In seconds
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

const isAbsoluteUrl = (url: string) => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');
  return r.test(url) ?? false;
};

const MainPage: FC<Props> = ({
  mainArticle,
  newsArticles,
  popularCommunityTopics
}) => {
  const [firstImage] =
    (mainArticle?.data?.attributes?.content?.filter(content =>
      isBasicImage(content)
    ) as ComponentBasicImage[]) ?? [];

  const [firstParagraph] =
    (mainArticle?.data?.attributes?.content?.filter(content =>
      isBasicParagraph(content)
    ) as ComponentBasicParagraph[]) ?? [];

  const infoBoxes =
    (mainArticle?.data?.attributes?.content?.filter(content =>
      isBasicInfoBox(content)
    ) as ComponentBasicInfobox[]) ?? [];

  return (
    <>
      <Head
        title={translations.translate('title') as string}
        description={firstParagraph?.content ?? ''}
      />
      <Root>
        <SC.ShutDown>
          <SC.ShutDownContent>
            <p>
              Datafabrikken vil legges ned 30. april 2024. Datafabrikken og
              data.norge.no fyller samme behov i dag. Ved å samle ressursene
              rundt data.norge.no vil vi få større kraft til å lage en bedre
              løsning som dekker både næringslivets og offentlig sektors behov.
              Du vil fortsatt finne datasettbeskrivelser på data.norge.no.
              Ønsker du å bidra til at data.norge.no blir bedre? Ta kontakt med
              oss på&nbsp;
              <a href='mailto:fellesdatakatalog@digdir.no'>
                fellesdatakatalog@digdir.no
              </a>
              .
            </p>
          </SC.ShutDownContent>
        </SC.ShutDown>
        <SC.BannerSection
          $bg={
            firstImage &&
            `${STRAPI_API_HOST}${firstImage.media?.data?.attributes?.url}`
          }
        >
          <SC.BannerSectionGradient />
          <SC.BannerContainer>
            {firstParagraph && <SC.Title>{firstParagraph.content}</SC.Title>}

            <SC.BannerInfoBoxRow>
              {infoBoxes.slice(0, 3).map(infoBox => (
                <InfoBox
                  key={infoBox?.id}
                  {...(isAbsoluteUrl(`${infoBox?.link}`)
                    ? {
                        href: infoBox?.link ?? '',
                        target: '_blank',
                        externalLink: true
                      }
                    : {
                        href: infoBox?.link ?? ''
                      })}
                >
                  <InfoBoxIcon>
                    <InfoBoxImage
                      src={`${STRAPI_API_HOST}${infoBox?.illustration?.data?.attributes?.url}`}
                      alt={
                        infoBox?.illustration?.data?.attributes
                          ?.alternativeText ?? `${infoBox?.id}-illustration`
                      }
                      hoverSrc={
                        infoBox?.hoverIllustration?.data?.attributes?.url &&
                        `${STRAPI_API_HOST}${infoBox.hoverIllustration.data.attributes.url}`
                      }
                      hoverAlt={
                        infoBox?.hoverIllustration?.data?.attributes
                          ?.alternativeText ?? `${infoBox?.id}-illustration`
                      }
                    />
                  </InfoBoxIcon>
                  <InfoBoxTitle>
                    <h4>{infoBox?.title}</h4>
                  </InfoBoxTitle>
                  <InfoBoxBody>
                    <Markdown allowHtml>{infoBox?.content ?? ''}</Markdown>
                  </InfoBoxBody>
                </InfoBox>
              ))}
            </SC.BannerInfoBoxRow>
          </SC.BannerContainer>
        </SC.BannerSection>
        <SC.MainContentSection id='mainContentSection'>
          <SC.Container>
            <SC.MainContent>
              <SC.Row>
                <SC.Topics>
                  <SC.IllustrationBox>
                    <CommunityIllustration />
                    <SC.IllustrationContent>
                      {infoBoxes.slice(3, 4).map(infoBox => (
                        <ContentBox>
                          <ContentBoxHeader>
                            <ContentBoxSC.ContentBoxHeader.Title>
                              {infoBox?.title}
                            </ContentBoxSC.ContentBoxHeader.Title>
                          </ContentBoxHeader>
                          <ContextBoxBody>
                            <Markdown allowHtml>
                              {infoBox?.content ?? ''}
                            </Markdown>
                          </ContextBoxBody>
                        </ContentBox>
                      ))}
                    </SC.IllustrationContent>
                  </SC.IllustrationBox>
                  {popularCommunityTopics
                    ?.filter(topic => !topic.deleted)
                    ?.slice(0, 3)
                    ?.map((topic, index) => (
                      <Topic
                        key={`topic-${index}`}
                        topic={topic}
                        hideUserInfoAndTags
                      />
                    ))}
                  <SC.LinkWrapper>
                    <Link href={PATHNAME.COMMUNITY} external hideIcon>
                      <Translation id='main.seeAllPostsCommunity' />
                    </Link>
                  </SC.LinkWrapper>
                </SC.Topics>
              </SC.Row>
              <SC.Row>
                {infoBoxes.slice(4, 6).map((infoBox, index: number) => (
                  <InfoBox
                    key={infoBox?.id}
                    {...(isAbsoluteUrl(`${infoBox?.link}`)
                      ? {
                          href: infoBox?.link ?? '',
                          target: '_blank',
                          externalLink: true
                        }
                      : {
                          href: infoBox?.link ?? ''
                        })}
                  >
                    <InfoBoxIcon>
                      {index === 0 ? (
                        <CourseIllustration width='100%' viewBox='0 0 96 96' />
                      ) : (
                        <GuideIllustration width='100%' viewBox='0 0 96 96' />
                      )}
                    </InfoBoxIcon>
                    <InfoBoxTitle>
                      <h4>{infoBox?.title}</h4>
                    </InfoBoxTitle>
                    <InfoBoxBody>
                      <Markdown allowHtml>{infoBox?.content ?? ''}</Markdown>
                    </InfoBoxBody>
                  </InfoBox>
                ))}
              </SC.Row>
              {infoBoxes.slice(6).map((infoBox, index: number) => (
                <SC.Row key={`row-${index}`}>
                  <SC.Teaser>
                    <SC.IllustrationBox>
                      <BoxOfDataIllustration />
                      <SC.IllustrationContent>
                        <ContentBox>
                          <ContentBoxHeader>
                            <ContentBoxSC.ContentBoxHeader.Title>
                              {infoBox?.title}
                            </ContentBoxSC.ContentBoxHeader.Title>
                          </ContentBoxHeader>
                          <ContextBoxBody>
                            <Markdown allowHtml>
                              {infoBox?.content ?? ''}
                            </Markdown>
                          </ContextBoxBody>
                        </ContentBox>
                      </SC.IllustrationContent>
                    </SC.IllustrationBox>
                  </SC.Teaser>
                </SC.Row>
              ))}
              <SC.NewsRow>
                {newsArticles?.data?.map(({ id, attributes: article }) => (
                  <InfoBox
                    key={id}
                    href={`${PATHNAME.NEWS}/${article?.slug}-${id}`}
                  >
                    {article?.socialImage && (
                      <InfoBoxImage
                        src={`${STRAPI_API_HOST}${article?.socialImage.data?.attributes?.url}`}
                        alt={
                          article?.socialImage.data?.attributes
                            ?.alternativeText ?? ''
                        }
                      />
                    )}
                    <InfoBoxSC.InfoBox.Date>
                      {article?.published &&
                        formatDate(dateStringToDate(article?.published))}
                      {!article?.published &&
                        formatDate(dateStringToDate(article?.publishedAt))}
                    </InfoBoxSC.InfoBox.Date>
                    <InfoBoxTitle>
                      <h4>{article?.title}</h4>
                    </InfoBoxTitle>
                    <InfoBoxBody>{article?.subtitle}</InfoBoxBody>
                  </InfoBox>
                ))}
              </SC.NewsRow>
              <NewsletterSubscribe />
            </SC.MainContent>
          </SC.Container>
        </SC.MainContentSection>
      </Root>
    </>
  );
};

export default compose<FC>(memo)(MainPage);
