import axios from 'axios';

import env from '../../../env';

const { FDK_PORTAL_HOST } = env.clientEnv;
const { FDK_DATASET_PREVIEW_API_KEY } = env.serverEnv;

interface Props {
  method: any;
  data?: any;
}

export const datasetPreviewApi = async ({ method, data }: Props) =>
  axios({
    url: `${FDK_PORTAL_HOST}/dataset/preview`,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': FDK_DATASET_PREVIEW_API_KEY
    },
    method,
    data
  }).then(r => r.data);

export const datasetPreviewApiPost = (data: any) =>
  datasetPreviewApi({ method: 'POST', data });
