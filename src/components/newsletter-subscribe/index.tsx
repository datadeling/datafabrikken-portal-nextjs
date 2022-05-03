import React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import NewsletterForm from './components/form';

import env from '../../../env';
import Translation from '../translation';

import SC from './styled';

const { MAILCHIMP_HOST } = env.clientEnv;

const NewsletterSubscribe = () => (
  <SC.NewsletterSubscribe>
    <SC.NewsLetterIcon />
    <SC.Container>
      <SC.Title>
        <Translation id='newsLetter.title' />
      </SC.Title>
      <SC.Subtitle>
        <Translation id='newsLetter.description' />
      </SC.Subtitle>
      <MailchimpSubscribe
        url={MAILCHIMP_HOST}
        render={props => {
          const { subscribe, status, message } = props || {};
          return (
            <NewsletterForm
              status={status}
              message={message}
              onValidated={(formData: any) => subscribe(formData)}
            />
          );
        }}
      />
      <SC.Disclaimer>
        <a href='https://www.digdir.no/om-oss/personvernerklaering/706'>
          <Translation id='newsLetter.readMore' />
        </a>
      </SC.Disclaimer>
    </SC.Container>
  </SC.NewsletterSubscribe>
);

export default NewsletterSubscribe;
