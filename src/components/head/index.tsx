import React, { FC, memo } from 'react';
import NextHead from 'next/head';

interface Props {
  title?: string;
  description?: string;
  previewImageSrc?: string;
}

const Head: FC<Props> = ({
  title = 'Datafabrikken',
  description = 'Datafabrikken er en webapplikasjon som gir deg muligheten til å lage og bruke digitale kilder til å utvikle dine data.',
  previewImageSrc = 'https://cms.datafabrikken.norge.no/uploads/featured_image_e050281eed.jpg'
}) => (
  <NextHead>
    {title && (
      <>
        <title>{title}</title>
        <meta property='og:title' content={title} />
      </>
    )}
    {description && (
      <>
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
      </>
    )}
    {previewImageSrc && (
      <>
        <meta property='og:image' content={previewImageSrc} />
        <meta property='og:image:secure_url' content={previewImageSrc} />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content='Datafabrikken forhåndsvisning' />
      </>
    )}
    <meta
      name='google-site-verification'
      content='Xt23I5ex1yqgSPAa5rDFnXalunEvKaIRKp3vypOwegE'
    />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='author' content='Digitaliseringsdirektoratet' />
    <meta property='og:type' content='website' />
  </NextHead>
);

export default memo(Head);
