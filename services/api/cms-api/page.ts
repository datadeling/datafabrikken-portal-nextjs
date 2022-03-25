import { deserialize } from 'deserialize-json-api';
import { cmsApiGet } from './host';

export const getPageEntity = (id: string) =>
  cmsApiGet(
    `/node/page/${id}?include=field_modules,field_modules.field_modules,field_modules.field_image,field_modules.field_image.field_media_image,field_global_taxonomy,field_modules.field_remote_video`
  ).then(deserialize);

export const extractPageData = (response: any) => response.data ?? [];
