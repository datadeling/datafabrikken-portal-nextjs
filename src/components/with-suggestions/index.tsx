import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { SearchSuggestion } from '../../types';

export interface Props {
  cachedSuggestions?: Record<string, SearchSuggestion[]>;
  searchSuggestionsActions: typeof actions;
}

const withSearchSuggestions = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    cachedSuggestions:
      state.SuggestionsReducer.get('cachedSuggestions')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    searchSuggestionsActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withSearchSuggestions;
