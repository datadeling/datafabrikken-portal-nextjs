import type { CommunityRecentResponse } from '../../../types';
import { communityApiGet } from './host';

export const getRecentTopics = () => communityApiGet(`/recent`);
export const getPopularTopics = () =>
  communityApiGet<CommunityRecentResponse>(`/popular`);
export const getTopicsByTag = (tag: string) => communityApiGet(`/tags/${tag}`);

export const extractTopics = (data: any) => data.topics ?? [];
