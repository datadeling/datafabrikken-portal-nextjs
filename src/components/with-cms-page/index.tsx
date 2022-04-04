import React, { memo, FC, ComponentType } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as actions from './redux/actions';

import type { CmsArticle } from '../../types';

export interface Props {
  cmsPage: Partial<CmsArticle> | null;
  cmsPageActions: typeof actions;
}

const withCmsPage = (Component: ComponentType<any>) => {
  const WrappedComponent = (props: Props) => <Component {...props} />;

  const mapStateToProps = (state: any) => ({
    cmsPage: state.CmsPageReducer.get('page')?.toJS() ?? null
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    cmsPageActions: bindActionCreators(actions, dispatch)
  });

  return compose<FC>(
    memo,
    connect(mapStateToProps, mapDispatchToProps)
  )(WrappedComponent);
};

export default withCmsPage;
