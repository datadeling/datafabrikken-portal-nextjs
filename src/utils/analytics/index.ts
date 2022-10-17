import ReactGA from 'react-ga4';

import { GoogleAnalyticsTrackingId, PATHNAME } from '../../types/enums';
import { Router } from 'next/router';

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
            testMode: window.location.hostname !== 'datafabrikken.norge.no',
            gaOptions: { anonymizeIp: true }
          }
        );

        registerPageViews();
      } catch (error) {}
    }
  }
};
