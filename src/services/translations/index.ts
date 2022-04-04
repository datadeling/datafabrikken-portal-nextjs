import LocalizedStrings from 'react-localization';

import nb from '../../l10n/nb.json';

import type { TextLanguage } from '../../types';
import type { FormatObject, Formatted } from './types';

import { Language } from './enums';
import { useRouter } from 'next/router';

export const getLocale = () => {
  const { locale } = useRouter();
  return locale;
};

class TranslationsService {
  private language: Language;

  private readonly translations = new LocalizedStrings({
    [Language.NB]: nb
  });

  public init(language: Language) {
    this.language = language;

    this.translations.setLanguage(this.language);
  }

  public getLanguage(): Language {
    return (getLocale() as Language) ?? Language.NB;
  }

  public translate(key: string, values?: FormatObject): Formatted[] | string {
    return this.translations.formatString(
      this.translations.getString(key),
      values as any
    );
  }

  public getTranslateText(textObj?: string | Partial<TextLanguage> | null) {
    if (textObj == null) {
      return null;
    }
    if (typeof textObj === 'string') {
      return textObj;
    }

    return (
      textObj[this.getLanguage()] ||
      textObj.nb ||
      textObj.no ||
      textObj.nn ||
      textObj.en ||
      null
    );
  }

  public getTranslateTextWithLanguageCode(
    textObj?: string | Partial<TextLanguage>,
    language?: Language
  ) {
    const selectedLanguage = language || this.getLanguage();
    if (textObj == null) {
      return null;
    }
    if (typeof textObj === 'string') {
      return textObj;
    }

    return textObj?.[selectedLanguage] || null;
  }
}

export default new TranslationsService();
export { Language } from './enums';
export type { Formatted, FormatObject };
