import axios from 'axios';

import env from '../../../env';

const { REFERENCE_DATA_HOST } = env;

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const referenceDataApi = async ({ path, method, data }: Props) =>
  axios({
    url: `${REFERENCE_DATA_HOST}/reference-data/${path}`,
    method,
    data
  }).then(r => r.data);

export const referenceDataGet = (path: string) =>
  referenceDataApi({ path, method: 'GET' });
