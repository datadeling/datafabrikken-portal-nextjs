import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import store from '../redux/store';

import GlobalStyles from '../styles';
import { defaultTheme as theme } from '../styles/theme';
import TranslationsProvider from '../providers/translations';
import Footer from '../components/footer';
import Header from '../components/header';
import { useApollo } from '../utils/apollo/apolloClient';
import translations from '../services/translations';

function App({ Component, pageProps }: AppProps) {
  const pageTitleFallback = translations.translate('title') as string;
  const pageDescriptionFallback = translations.translate(
    'footer.byLine'
  ) as string;

  const apolloClient = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CookiesProvider>
        <TranslationsProvider>
          <ApolloProvider client={apolloClient}>
            <ReduxProvider store={store}>
              <Head>
                <title>{pageTitleFallback}</title>
                <meta property='og:title' content={pageTitleFallback} />
                <meta name='description' content={pageDescriptionFallback} />
                <meta name='og:description' content={pageDescriptionFallback} />
              </Head>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </ReduxProvider>
          </ApolloProvider>
        </TranslationsProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
