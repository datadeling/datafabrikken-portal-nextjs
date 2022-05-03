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
import { PATHNAME } from '../types/enums';
import { getNews, getCmsPage } from '../services/api/cms-api/news';
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

const articleId = 'bb81d27f-acf1-4fc6-9bc3-f289bf79207f';

export async function getStaticProps() {
  const sixHoursInSeconds = 60 * 60 * 6; // 6 hrs
  const cmsNews = await getNews(3);
  const cmsPage = await getCmsPage(articleId);
  const popularCommunityTopics = (await getPopularTopics())?.topics;
  const totalDatasets = extractDatasetsTotal(await searchDatasets({}));

  return {
    props: {
      cmsNews,
      cmsPage,
      popularCommunityTopics,
      totalDatasets
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every revalidate seconds
    revalidate: sixHoursInSeconds // In seconds
  };
}

interface Props extends InferGetStaticPropsType<typeof getStaticProps> {}

const isAbsoluteUrl = (url: string) => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i');
  return r.test(url) ?? false;
};

const MainPage: FC<Props> = ({
  cmsNews,
  cmsPage,
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

  const [firstElement, secondElement, ...modules] =
    cmsPage?.field_modules ?? [];

  return (
    <>
      <Head
        title={translations.translate('title') as string}
        description={firstElement?.field_title}
      />
      <Root>
        <SC.Container>
          <SC.BannerSection>
            <SC.Row>
              <ContentBox>
                <ContentBoxHeader as='h1'>
                  <ContentBoxSC.ContentBoxHeader.Title>
                    {firstElement?.field_title}
                  </ContentBoxSC.ContentBoxHeader.Title>
                </ContentBoxHeader>
                <ContextBoxBody>
                  <Markdown allowHtml>
                    {firstElement?.field_body?.processed}
                  </Markdown>
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
                        query: { search: searchString || '' }
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
                            {secondElement?.field_title}
                          </ContentBoxSC.ContentBoxHeader.Title>
                        </ContentBoxHeader>
                        <ContextBoxBody>
                          <Markdown allowHtml>
                            {secondElement?.field_body?.processed}
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
                {modules.slice(0, 2).map((module: any, index: number) => (
                  <InfoBox
                    key={module.id}
                    {...(isAbsoluteUrl(
                      module?.field_link?.uri?.replace('internal:', '')
                    )
                      ? {
                          href: module.field_link?.uri,
                          target: '_blank',
                          externalLink: true
                        }
                      : {
                          href: module?.field_link?.uri?.replace(
                            'internal:',
                            ''
                          )
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
                      <h3>{module.field_link?.title}</h3>
                    </InfoBoxTitle>
                    <InfoBoxBody>
                      <Markdown allowHtml>
                        {module.field_body?.processed}
                      </Markdown>
                    </InfoBoxBody>
                  </InfoBox>
                ))}
              </SC.Row>
              {modules.slice(2, 3).map((module: any, index: number) => (
                <SC.Row key={`row-${index}`}>
                  <SC.Teaser>
                    <SC.IllustrationBox>
                      <BoxOfDataIllustration />
                      <SC.IllustrationContent>
                        <ContentBox>
                          <ContentBoxHeader>
                            <ContentBoxSC.ContentBoxHeader.Title>
                              {module?.field_title}
                            </ContentBoxSC.ContentBoxHeader.Title>
                          </ContentBoxHeader>
                          <ContextBoxBody>
                            <Markdown allowHtml>
                              {module?.field_body?.processed}
                            </Markdown>
                          </ContextBoxBody>
                        </ContentBox>
                      </SC.IllustrationContent>
                    </SC.IllustrationBox>
                  </SC.Teaser>
                </SC.Row>
              ))}
              <SC.NewsRow>
                {cmsNews?.map(
                  ({
                    id,
                    created,
                    title,
                    field_ingress: ingress,
                    field_image_some: image_some
                  }) => (
                    <InfoBox key={id} href={`${PATHNAME.NEWS}/${id}`}>
                      {image_some && (
                        <InfoBoxImage
                          src={image_some.thumbnail.download_urls.canonical}
                          alt={image_some.thumbnail.meta.alt}
                        />
                      )}
                      <InfoBoxSC.InfoBox.Date>
                        {created && formatDate(dateStringToDate(created))}
                      </InfoBoxSC.InfoBox.Date>
                      <InfoBoxTitle>
                        <h4>{title}</h4>
                      </InfoBoxTitle>
                      <InfoBoxBody>{ingress}</InfoBoxBody>
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
