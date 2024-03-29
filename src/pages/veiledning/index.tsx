import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';

import SC from '../../styles/pages/veiledning';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';
import Root from '../../components/root';
import GuideCard from '../../components/info-card';
import Markdown from '../../components/markdown';

import {
  ComponentBasicInfobox,
  Enum_Guide_Primarytargetgroup,
  FancyArticleEntityResponse,
  GetGuidanceDocument,
  GetGuidanceQueryResult,
  GuideEntityResponseCollection,
  ProviderEntity,
  ProviderEntityResponseCollection
} from '../../services/api/generated/cms/graphql';
import { RadioOption } from '../../components/radio-options';
import {
  isBasicInfoBox,
  isBasicParagraph,
  isProvider
} from '../../utils/strapi';
import { InfoBoxStrapi } from '../../components/info-box';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import Breadcrumbs from '../../components/breadcrumbs';
import Head from '../../components/head';

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();
  const { data }: GetGuidanceQueryResult = await apolloClient.query({
    query: GetGuidanceDocument
  });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

interface Props {
  guides?: GuideEntityResponseCollection;
  topArticle?: FancyArticleEntityResponse;
  providers?: ProviderEntityResponseCollection;
}

const GuidancePage: FC<Props> = ({ guides, topArticle, providers }) => {
  const pageTitle = topArticle?.data?.attributes?.title ?? undefined;
  const ingressParagraph = isBasicParagraph(
    topArticle?.data?.attributes?.content?.[0]
  )
    ? topArticle?.data?.attributes?.content?.[0].content ?? undefined
    : undefined;
  const coursesParagraph = isBasicParagraph(
    topArticle?.data?.attributes?.content?.[1]
  )
    ? topArticle?.data?.attributes?.content?.[1]?.content ?? undefined
    : undefined;

  const [selectedTargetGroup, setSelectedTargetGroup] =
    useState<Enum_Guide_Primarytargetgroup>();

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

  const infoBoxes =
    (topArticle?.data?.attributes?.content?.filter(content =>
      isBasicInfoBox(content)
    ) as ComponentBasicInfobox[]) ?? [];

  return (
    <>
      <Head title={pageTitle} description={ingressParagraph} />
      <Breadcrumbs />
      <Root>
        <SC.Header>
          <SC.Container>
            <SC.Title>{pageTitle}</SC.Title>
            <SC.Subtitle>
              {ingressParagraph && <Markdown>{ingressParagraph}</Markdown>}
            </SC.Subtitle>
          </SC.Container>
        </SC.Header>
        <SC.GuideSection>
          <SC.Container>
            <SC.InfoBoxContainer>
              {infoBoxes.map(infoBox => (
                <InfoBoxStrapi infoBox={infoBox} />
              ))}
            </SC.InfoBoxContainer>
            {coursesParagraph && <Markdown>{coursesParagraph ?? ''}</Markdown>}
            <SC.RadioContainer>
              <RadioOption
                value={undefined}
                label='guidancePage.radio.all'
                group='PrimaryTargetGroup'
                id='radio0'
                checked={!selectedTargetGroup}
                onChange={() => setSelectedTargetGroup(undefined)}
              />
              <RadioOption
                value={Enum_Guide_Primarytargetgroup.DataProvider}
                label='guidancePage.radio.provider'
                group='PrimaryTargetGroup'
                id='radio1'
                checked={
                  selectedTargetGroup ===
                  Enum_Guide_Primarytargetgroup.DataProvider
                }
                onChange={() =>
                  setSelectedTargetGroup(
                    Enum_Guide_Primarytargetgroup.DataProvider
                  )
                }
              />
              <RadioOption
                value={Enum_Guide_Primarytargetgroup.DataConsumer}
                label='guidancePage.radio.consumer'
                group='PrimaryTargetGroup'
                id='radio2'
                checked={
                  selectedTargetGroup ===
                  Enum_Guide_Primarytargetgroup.DataConsumer
                }
                onChange={() =>
                  setSelectedTargetGroup(
                    Enum_Guide_Primarytargetgroup.DataConsumer
                  )
                }
              />
            </SC.RadioContainer>
            <SC.GuideCardContainer>
              {guides?.data
                ?.filter(
                  guide =>
                    !selectedTargetGroup ||
                    (guide != null &&
                      guide.attributes?.primaryTargetGroup != null &&
                      guide.attributes?.primaryTargetGroup ===
                        selectedTargetGroup)
                )
                ?.map(guide => (
                  <GuideCard
                    infoObject={guide}
                    provider={providersById[`${guide.attributes?.providerId}`]}
                  />
                ))}
            </SC.GuideCardContainer>
          </SC.Container>
        </SC.GuideSection>
      </Root>
    </>
  );
};

export default compose<FC>(memo, withErrorBoundary(ErrorPage))(GuidancePage);
