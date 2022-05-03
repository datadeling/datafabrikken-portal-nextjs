import { KeyboardEvent, FC, useState } from 'react';
import { decode } from 'html-entities';

import translations from '../../../../services/translations';

import SC from './styled';
import Translation from '../../../translation';

interface Props {
  status: string | null;
  message: any;
  onValidated: any;
}

const NewsletterForm: FC<Props> = ({ status, message, onValidated }) => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleFormSubmit = () => {
    setError(null);
    if (!email) {
      setError(translations.translate('newsLetter.validEmail') as string);
      return null;
    }
    const isFormValidated = onValidated({ EMAIL: email });
    return email && email.indexOf('@') > -1 && isFormValidated;
  };

  const handleInputKeyEvent = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  const getMessage = () => {
    if (!message) {
      return '';
    }
    const result = message?.split('-') ?? null;
    if ('0' !== result?.[0]?.trim()) {
      return decode(message);
    }
    const formattedMessage = result?.[1]?.trim() ?? null;
    return formattedMessage ? decode(formattedMessage) : '';
  };

  return (
    <SC.NewsletterForm>
      <SC.Container>
        <SC.InputField>
          <input
            onChange={event => setEmail(event?.target?.value ?? '')}
            type='email'
            placeholder={
              translations.translate('newsLetter.setEmail') as string
            }
            onKeyUp={event => handleInputKeyEvent(event)}
          />
        </SC.InputField>
        <SC.SubmitButton onClick={handleFormSubmit}>
          <Translation id='newsLetter.send' />
        </SC.SubmitButton>
      </SC.Container>
      <SC.NewsLetterInfo>
        {status === 'sending' && (
          <div>
            <Translation id='newsLetter.sending' />
          </div>
        )}
        {status === 'error' || error ? (
          <div
            dangerouslySetInnerHTML={{
              __html: error || getMessage()
            }}
          />
        ) : null}
        {status === 'success' && !error && (
          <div dangerouslySetInnerHTML={{ __html: decode(message) }} />
        )}
      </SC.NewsLetterInfo>
    </SC.NewsletterForm>
  );
};

export default NewsletterForm;
