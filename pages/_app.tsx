import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import type { AppProps } from 'next/app';
import GlobalStyles from '../styles';
import { defaultTheme as theme } from '../styles/theme';

import TranslationsProvider from '../providers/translations';

import store from '../redux/store';

import env from '../env';
import Footer from '../components/footer';
import Header from '../components/header';

const { STRAPI_API_HOST } = env;

const client = new ApolloClient({
  uri: `${STRAPI_API_HOST}/graphql`,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CookiesProvider>
        <TranslationsProvider>
          <ApolloProvider client={client}>
            <ReduxProvider store={store}>
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

export default MyApp;
