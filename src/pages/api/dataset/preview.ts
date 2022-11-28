import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';
import env from '../../../../env';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { FDK_PORTAL_HOST } = env.clientEnv;

  return httpProxyMiddleware(req, res, {
    target: `${FDK_PORTAL_HOST}/dataset/preview`,
    pathRewrite: [
      {
        patternStr: '^/api/dataset/preview',
        replaceStr: ''
      }
    ]
  });
};
