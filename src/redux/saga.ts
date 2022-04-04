import { all } from 'redux-saga/effects';

import cmsPageSaga from '../components/with-cms-page/redux/saga';
import cmsNewsSaga from '../components/with-cms-news/redux/saga';
import communityTopicsSaga from '../components/with-community-topics/redux/saga';
import datasetsSaga from '../components/with-datasets/redux/saga';
import suggestionsSaga from '../components/with-suggestions/redux/saga';

export default function* saga() {
  yield all([
    cmsPageSaga(),
    cmsNewsSaga(),
    communityTopicsSaga(),
    datasetsSaga(),
    suggestionsSaga()
  ]);
}
