import axios from 'axios';

import env from '../../../env';

const { COMMUNITY_API_HOST } = env;

interface Props {
  path: string;
  method: any;
  data?: any;
}

export async function communityApi<T>({
  path,
  method,
  data
}: Props): Promise<T | null> {
  try {
    const r = await axios({
      url: `${COMMUNITY_API_HOST}/api${path}`,
      headers: {
        'Content-Type': 'application/json'
      },
      method,
      data
    });
    return r.data;
  } catch {
    return null;
  }
}

export function communityApiGet<T>(path: string) {
  return communityApi<T>({ path, method: 'GET' });
}
