import {
  GET_CMS_PAGE_REQUESTED,
  GET_CMS_PAGE_SUCCEEDED,
  GET_CMS_PAGE_FAILED,
  RESET_CMS_PAGE,
  GET_CMS_NEWS_ARTICLE_REQUESTED
} from './action-types';

import type { CmsArticle } from '../../../types';

export function getCmsPageRequested(id: string) {
  return {
    type: GET_CMS_PAGE_REQUESTED,
    payload: {
      id
    }
  };
}

export function getCmsPageSucceeded(page: Partial<CmsArticle>) {
  return {
    type: GET_CMS_PAGE_SUCCEEDED,
    payload: {
      page
    }
  };
}

export function getCmsPageFailed(message: string) {
  return {
    type: GET_CMS_PAGE_FAILED,
    payload: {
      message
    }
  };
}

export function resetCmsPage() {
  return {
    type: RESET_CMS_PAGE
  };
}

export function getCmsNewsArticleRequested(id: string) {
  return {
    type: GET_CMS_NEWS_ARTICLE_REQUESTED,
    payload: {
      id
    }
  };
}
