import React, { useEffect } from 'react';
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
import { useApollo } from '../utils/apollo/apolloClient';
import { initAnalytics } from '../utils/analytics';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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
