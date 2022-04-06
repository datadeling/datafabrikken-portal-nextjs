import { deserialize } from 'deserialize-json-api';
import type { CmsArticle } from '../../../types';
import { cmsApiGet } from './host';

export const extractData = (response: any) => response.data ?? [];

export const getNews = (pageLimit: number) =>
  cmsApiGet(
    `/node/news?filter[status]=1&page[limit]=${pageLimit}&&sort=-created&include=field_image_some,field_image_some.field_media_image`
  )
    .then(deserialize)
    .then(response => (response.data ?? []) as CmsArticle[]);

export const getCmsPage = (id: string) =>
  cmsApiGet(
    `/node/news/${id}?include=field_modules,field_modules.field_image,field_modules.field_image.field_media_image,field_global_taxonomy,field_modules.field_remote_video,field_image_some,field_image_some.field_media_image`
  )
    .then(deserialize)
    .then(response => response.data as CmsArticle | null);
