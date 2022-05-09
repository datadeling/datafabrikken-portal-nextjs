import { all } from 'redux-saga/effects';

import communityTopicsSaga from '../components/with-community-topics/redux/saga';
import datasetsSaga from '../components/with-datasets/redux/saga';
import suggestionsSaga from '../components/with-suggestions/redux/saga';

export default function* saga() {
  yield all([communityTopicsSaga(), datasetsSaga(), suggestionsSaga()]);
}
