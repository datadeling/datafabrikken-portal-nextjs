import axios from 'axios';
import env from '../../../env';

const { ORGANIZATION_HOST } = env.clientEnv;
interface Props {
  path: string;
  method: any;
  data?: any;
  params?: Record<string, string | number | undefined>;
}

export const organizationsApi = ({ path, method, data, params }: Props) =>
  axios({
    url: `${ORGANIZATION_HOST}${path}`,
    method,
    data,
    params
  }).then(({ data: responseData }) => responseData);

export const organizationsApiGet = (
  path: string,
  params?: Record<string, string | number | undefined>
) => organizationsApi({ path, method: 'GET', params });
