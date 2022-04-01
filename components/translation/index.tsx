import React, { memo, FC } from 'react';
import { compose } from 'redux';
import translations, { FormatObject } from '../../services/translations';

import type { TextLanguage } from '../../types';

interface ExternalProps {
  id?: string;
  values?: FormatObject;
  text?: Partial<TextLanguage>;
}

interface Props extends ExternalProps {}

const Translation: FC<Props> = ({ id, values, text }) => {
  if (id) {
    return <>{translations.translate(id, values)}</>;
  }
  if (text) {
    return <>{translations.getTranslateText(text)}</>;
  }
  return <></>;
};

export default compose<FC<ExternalProps>>(memo)(Translation);
