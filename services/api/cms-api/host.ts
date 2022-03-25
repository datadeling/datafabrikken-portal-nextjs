import axios from 'axios';

import env from '../../../env';

const { CMS_API_HOST } = env;

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const cmsApi = async ({ path, method, data }: Props) =>
  axios({
    url: `${CMS_API_HOST}/api/content${path}`,
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    method,
    data
  })
    .then(r => r.data)
    .catch(null);

export const cmsApiGet = (path: string) => cmsApi({ path, method: 'GET' });
