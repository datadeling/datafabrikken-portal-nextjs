import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import store from '../redux/store';

import GlobalStyles from '../styles';
import { defaultTheme as theme } from '../styles/theme';
import Footer from '../components/footer';
import Header from '../components/header';

import AnalyticsMonsido from '../components/analytics-monsido';
import AnalyticsSiteImprove from '../components/analytics-siteimprove';
import { useApollo } from '../utils/apollo/apolloClient';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AnalyticsMonsido />
      <AnalyticsSiteImprove />
      <CookiesProvider>
        <ApolloProvider client={apolloClient}>
          <ReduxProvider store={store}>
            <Header {...pageProps} />
            <Component {...pageProps} />
            <Footer {...pageProps} />
          </ReduxProvider>
        </ApolloProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
