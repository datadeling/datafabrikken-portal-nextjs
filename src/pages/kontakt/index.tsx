import React, { FC, memo } from 'react';
import { compose } from 'redux';
import Breadcrumbs from '../../components/breadcrumbs';
import Root from '../../components/root';
import env from '../../../env';
import {
  ComponentBasicContact,
  FancyArticleEntityResponse,
  GetContactsDocument,
  GetContactsQueryResult
} from '../../services/api/generated/cms/graphql';
import { initializeApollo } from '../../utils/apollo/apolloClient';
import NewsletterSubscribe from '../../components/newsletter-subscribe';

import SC from '../../styles/pages/kontakt';
import Head from '../../components/head';

const { STRAPI_API_HOST } = env.clientEnv;

export async function getStaticProps() {
  const fiveMinutesInSeconds = 300;
  const apolloClient = initializeApollo();
  const { data }: GetContactsQueryResult = await apolloClient.query({
    query: GetContactsDocument
  });

  return {
    props: {
      ...data
    },
    revalidate: fiveMinutesInSeconds
  };
}

interface Props {
  contactPage: FancyArticleEntityResponse;
}

const FindDataPage: FC<Props> = ({ contactPage }) => {
  const attr = contactPage.data?.attributes;
  const pageTitle = attr?.title ?? undefined;

  const ingress =
    attr?.content?.[0]?.__typename === 'ComponentBasicParagraph'
      ? attr.content[0].content ?? undefined
      : undefined;

  const contacts = (attr?.content?.filter(
    c => c && c.__typename === 'ComponentBasicContact'
  ) ?? []) as Partial<ComponentBasicContact>[];

  return (
    <>
      <Head title={pageTitle} description={ingress} />
      <Breadcrumbs />
      <Root>
        <SC.Header>
          <SC.Container>
            <SC.Title>{attr?.title}</SC.Title>
            {ingress && <SC.Ingress>{ingress}</SC.Ingress>}
          </SC.Container>
        </SC.Header>
        <SC.Container>
          <SC.ContactCardContainer>
            {contacts.map(({ image, name, jobTitle, phoneNumber, email }) => (
              <SC.ContactCard key={`contact-${name}`}>
                {image?.data?.attributes?.url && (
                  <SC.ContactImage
                    src={`${STRAPI_API_HOST}${image.data?.attributes?.url}`}
                  />
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
          <SC.NewsletterSubscribe>
            <NewsletterSubscribe />
          </SC.NewsletterSubscribe>
        </SC.Container>
      </Root>
    </>
  );
};

export default compose<FC>(memo)(FindDataPage);
