import axios from 'axios';

import env from '../../../../env';

const { SEARCH_FULLTEXT_HOST } = env.clientEnv;

interface Props {
  path: string;
  method: any;
  data?: any;
}

export const searchFullTextApi = ({ path, method, data }: Props) =>
  axios({
    url: `${SEARCH_FULLTEXT_HOST}${path}`,
    method,
    data
  })
    .then(r => r.data)
    .catch(() => null);

export const searchFullTextApiPost = (path: string, body: any) =>
  searchFullTextApi({ path, method: 'POST', data: body });

export const searchFullTextApiGet = (path: string) =>
  searchFullTextApi({ path, method: 'GET' });
