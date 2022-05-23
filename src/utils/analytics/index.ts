import ReactGA from 'react-ga4';

import {
  Environment,
  GoogleAnalyticsTrackingId,
  PATHNAME
} from '../../types/enums';
import env from '../../../env';
import { Router } from 'next/router';

const { ENV } = env.clientEnv;

const registerPageView = () => {
  const page = window.location.pathname;
  ReactGA.send({ hitType: 'pageview', page });
};

const registerPageViews = () => {
  registerPageView();

  Router.events.on('routeChangeComplete', () => {
    registerPageView();
  });
};

export const initAnalytics = () => {
  if (!ReactGA.isInitialized && typeof window !== 'undefined') {
    const isCommunity = window.location.pathname.includes(PATHNAME.COMMUNITY);

    const trackingIds = [GoogleAnalyticsTrackingId.DATAFABRIKKEN];
    if (isCommunity) {
      trackingIds.push(GoogleAnalyticsTrackingId.COMMUNITY);
    }

    if (trackingIds.length > 0) {
      try {
        ReactGA.initialize(
          trackingIds.map(trackingId => ({
            trackingId
          })),
          {
            testMode: ENV !== Environment.PRODUCTION,
            gaOptions: { anonymizeIp: true }
          }
        );

        registerPageViews();
      } catch (error) {}
    }
  }
};
