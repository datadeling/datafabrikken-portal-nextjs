import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import lottie from 'lottie-web';

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
import AutosuggestSearchbar from '../components/autosuggest-searchbar';
import Translation from '../components/translation';
import Topic from '../components/community/topic';

import { dateStringToDate, formatDate } from '../utils/date';

import SC from '../styles/pages';

import factoryLottieJson from '../../public/images/factory.lottie.json';
import { getPopularTopics } from '../services/api/community-api/topics';
import {
  searchDatasets,
  extractDatasetsTotal
} from '../services/api/search-fulltext-api/datasets';

import CommunityIllustration from '../../public/images/illustration-community-large.inline.svg';
import CourseIllustration from '../../public/images/illustration-course.inline.svg';
import GuideIllustration from '../../public/images/illustration-guide.inline.svg';
import BoxOfDataIllustration from '../../public/images/illustration-box-of-data.inline.svg';
import ArrowDownIcon from '../../public/images/icon-arrow-down.inline.svg';
import translations from '../services/translations';
import Head from '../components/head';
import NewsletterSubscribe from '../components/newsletter-subscribe';
import {
  NewsArticle,
  GetMainArticleAndLatestNewsDocument,
  FancyArticle,
  ComponentBasicInfobox
} from '../services/api/generated/cms/graphql';
import { initializeApollo } from '../utils/apollo/apolloClient';
import { isBasicInfoBox } from '../utils/strapi';
import { PATHNAME } from '../types/enums';
import env from '../../env';

const { STRAPI_API_HOST } = env.clientEnv;
const mainArticleId = 12;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const popularCommunityTopics = (await getPopularTopics())?.topics;
  const totalDatasets = extractDatasetsTotal(await searchDatasets({}));

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GetMainArticleAndLatestNewsDocument,
    variables: {
      id: mainArticleId
    }
  });

  return {
    props: {
      data,
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
  data,
  totalDatasets,
  popularCommunityTopics
}) => {
  const router = useRouter();

  let animationRef: any = null;

  const initAnimation = () => {
    lottie.loadAnimation({
      container: animationRef,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: factoryLottieJson
    });
  };

  useEffect(() => {
    initAnimation();
  }, []);

  const {
    mainArticle,
    newsArticles
  }: { mainArticle: FancyArticle; newsArticles: NewsArticle[] } = data;

  const [firstInfoBox, secondInfoBox, ...mainContent] =
    (mainArticle?.content?.filter(content =>
      isBasicInfoBox(content)
    ) as ComponentBasicInfobox[]) ?? [];

  return (
    <>
      <Head
        title={translations.translate('title') as string}
        description={firstInfoBox?.title}
      />
      <Root>
        <SC.Container>
          <SC.BannerSection>
            <SC.Row>
              <ContentBox>
                <ContentBoxHeader as='h1'>
                  <ContentBoxSC.ContentBoxHeader.Title>
                    {firstInfoBox?.title}
                  </ContentBoxSC.ContentBoxHeader.Title>
                </ContentBoxHeader>
                <ContextBoxBody>
                  <Markdown allowHtml>{firstInfoBox?.content ?? ''}</Markdown>
                  <AutosuggestSearchbar
                    maxSuggestions={6}
                    placeholder={`${translations.translate(
                      'main.search.findData',
                      {
                        totalDatasets
                      }
                    )}`}
                    onSubmit={searchString =>
                      router.push({
                        pathname: PATHNAME.FIND_DATA,
                        query: { q: searchString || '' }
                      })
                    }
                  />
                </ContextBoxBody>
              </ContentBox>
              <div
                ref={ref => {
                  animationRef = ref;
                }}
              />
            </SC.Row>
            <SC.ArrowDown href='#mainContentSection'>
              <ArrowDownIcon />
            </SC.ArrowDown>
          </SC.BannerSection>
          <SC.MainContentSection id='mainContentSection'>
            <SC.MainContent>
              <SC.Row>
                <SC.Topics>
                  <SC.IllustrationBox>
                    <CommunityIllustration />
                    <SC.IllustrationContent>
                      <ContentBox>
                        <ContentBoxHeader>
                          <ContentBoxSC.ContentBoxHeader.Title>
                            {secondInfoBox?.title}
                          </ContentBoxSC.ContentBoxHeader.Title>
                        </ContentBoxHeader>
                        <ContextBoxBody>
                          <Markdown allowHtml>
                            {secondInfoBox?.content ?? ''}
                          </Markdown>
                        </ContextBoxBody>
                      </ContentBox>
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
                    <Link href={PATHNAME.COMMUNITY}>
                      <a>
                        <Translation id='main.seeAllPostsCommunity' />
                      </a>
                    </Link>
                  </SC.LinkWrapper>
                </SC.Topics>
              </SC.Row>
              <SC.Row>
                {mainContent.slice(0, 2).map((infoBox, index: number) => (
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
                        <CourseIllustration />
                      ) : (
                        <GuideIllustration />
                      )}
                    </InfoBoxIcon>
                    <InfoBoxTitle>
                      <h3>{infoBox?.title}</h3>
                    </InfoBoxTitle>
                    <InfoBoxBody>
                      <Markdown allowHtml>{infoBox?.content ?? ''}</Markdown>
                    </InfoBoxBody>
                  </InfoBox>
                ))}
              </SC.Row>
              {mainContent.slice(2, 3).map((infoBox, index: number) => (
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
                {newsArticles?.map(
                  ({
                    id,
                    published,
                    published_at,
                    title,
                    subtitle,
                    socialImage
                  }) => (
                    <InfoBox key={id} href={`${PATHNAME.NEWS}/${id}`}>
                      {socialImage && (
                        <InfoBoxImage
                          src={`${STRAPI_API_HOST}${socialImage.url}`}
                          alt={socialImage.alternativeText ?? ''}
                        />
                      )}
                      <InfoBoxSC.InfoBox.Date>
                        {published && formatDate(dateStringToDate(published))}
                        {!published &&
                          formatDate(dateStringToDate(published_at))}
                      </InfoBoxSC.InfoBox.Date>
                      <InfoBoxTitle>
                        <h4>{title}</h4>
                      </InfoBoxTitle>
                      <InfoBoxBody>{subtitle}</InfoBoxBody>
                    </InfoBox>
                  )
                )}
              </SC.NewsRow>
              <NewsletterSubscribe />
            </SC.MainContent>
          </SC.MainContentSection>
        </SC.Container>
      </Root>
    </>
  );
};

export default compose<FC>(memo)(MainPage);
