import { combineReducers } from 'redux';

import CommunityTopicsReducer from '../components/with-community-topics/redux/reducer';
import DatasetsReducer from '../components/with-datasets/redux/reducer';
import SuggestionsReducer from '../components/with-suggestions/redux/reducer';

export default combineReducers({
  CommunityTopicsReducer,
  DatasetsReducer,
  SuggestionsReducer
});
