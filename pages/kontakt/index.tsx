import React, { FC, memo } from 'react';
import Head from 'next/head';
import { compose } from 'redux';
import Breadcrumbs from '../../components/breadcrumbs';
import Root from '../../components/root';
import env from '../../env';
import {
  ComponentBasicContact,
  FancyArticle,
  GetContactsDocument
} from '../../services/api/generated/cms/graphql';
import { initializeApollo } from '../../utils/apollo/apolloClient';

import SC from '../../styles/pages/kontakt';

const { STRAPI_API_HOST } = env;

export async function getStaticProps() {
  const sixHoursInSeconds = 21600;
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GetContactsDocument
  });

  return {
    props: {
      ...data
    },
    revalidate: sixHoursInSeconds
  };
}

interface Props {
  contactPage?: FancyArticle;
}

const FindDataPage: FC<Props> = ({ contactPage }) => {
  const pageTitle = contactPage?.title;

  const ingress =
    contactPage?.content?.[0]?.__typename === 'ComponentBasicParagraph'
      ? contactPage.content[0].content
      : undefined;

  const contacts = (contactPage?.content?.filter(
    contact => contact && contact.__typename === 'ComponentBasicContact'
  ) ?? []) as Partial<ComponentBasicContact>[];

  return (
    <>
      {pageTitle && ingress && (
        <Head>
          <title>{pageTitle}</title>
          <meta property='og:title' content={pageTitle} />

          <meta name='description' content={ingress} />
          <meta name='og:description' content={ingress} />
        </Head>
      )}
      <Breadcrumbs />
      <Root>
        <SC.Header>
          <SC.Container>
            <SC.Title>{contactPage?.title}</SC.Title>
            {ingress && <SC.Ingress>{ingress}</SC.Ingress>}
          </SC.Container>
        </SC.Header>
        <SC.Container>
          <SC.ContactCardContainer>
            {contacts.map(({ image, name, jobTitle, phoneNumber, email }) => (
              <SC.ContactCard key={`contact-${name}`}>
                {image?.[0]?.url && (
                  <SC.ContactImage src={`${STRAPI_API_HOST}${image[0].url}`} />
                )}
                <SC.TopInfo>
                  <SC.ContactName>{name}</SC.ContactName>
                  <p>{jobTitle}</p>
                </SC.TopInfo>
                <p>{phoneNumber}</p>
                <SC.ContactEmail href={`mailto:${email}`}>
                  {email}
                </SC.ContactEmail>
              </SC.ContactCard>
            ))}
          </SC.ContactCardContainer>
        </SC.Container>
      </Root>
    </>
  );
};

export default compose<FC>(memo)(FindDataPage);
