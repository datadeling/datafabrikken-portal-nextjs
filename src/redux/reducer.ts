import { combineReducers } from 'redux';

import CmsPageReducer from '../components/with-cms-page/redux/reducer';
import CmsNewsReducer from '../components/with-cms-news/redux/reducer';
import CommunityTopicsReducer from '../components/with-community-topics/redux/reducer';
import DatasetsReducer from '../components/with-datasets/redux/reducer';
import SuggestionsReducer from '../components/with-suggestions/redux/reducer';

export default combineReducers({
  CmsPageReducer,
  CmsNewsReducer,
  CommunityTopicsReducer,
  DatasetsReducer,
  SuggestionsReducer
});
