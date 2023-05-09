import { withSentry } from '@sentry/nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

const PROD_ROBOTS = `User-agent: *\nAllow: /\nDisallow: /api`;
const DEV_ROBOTS = `User-agent: *\nDisallow: /\nDisallow: /api`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain');
  // Return a non-crawlable robots.txt in non-production environments
  res.write(process.env.APP_STAGE === 'production' ? PROD_ROBOTS : DEV_ROBOTS);
  res.end();
};

export default withSentry(handler);
