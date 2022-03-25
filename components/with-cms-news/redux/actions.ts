import {
  GET_CMS_NEWS_REQUESTED,
  GET_CMS_NEWS_SUCCEEDED,
  GET_CMS_NEWS_FAILED,
  RESET_CMS_NEWS
} from './action-types';

import type { CmsArticle } from '../../../types';

interface GetNewsParams {
  pageLimit: number;
}

export function getNewsRequested(params: GetNewsParams) {
  return {
    type: GET_CMS_NEWS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getNewsSucceeded(news: CmsArticle[]) {
  return {
    type: GET_CMS_NEWS_SUCCEEDED,
    payload: {
      news
    }
  };
}

export function getNewsFailed(message: string) {
  return {
    type: GET_CMS_NEWS_FAILED,
    payload: {
      message
    }
  };
}

export function resetNews() {
  return {
    type: RESET_CMS_NEWS
  };
}
