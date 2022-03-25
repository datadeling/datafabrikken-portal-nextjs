import React, { memo, FC } from 'react';
import { compose } from 'redux';

import {
  withTranslations,
  Props as TranslationsProps,
  FormatObject
} from '../../providers/translations';
import type { TextLanguage } from '../../types';

interface ExternalProps {
  id?: string;
  values?: FormatObject;
  text?: Partial<TextLanguage>;
}

interface Props extends ExternalProps, TranslationsProps {}

const Translation: FC<Props> = ({ translationsService, id, values, text }) => {
  if (id) {
    return <>{translationsService.translate(id, values)}</>;
  }
  if (text) {
    return <>{translationsService.getTranslateText(text)}</>;
  }
  return <></>;
};

export default compose<FC<ExternalProps>>(memo, withTranslations)(Translation);
