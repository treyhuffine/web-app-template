import { geolocation, ipAddress } from '@vercel/edge';
import { NextRequest } from 'next/server';
import { responseJson200Success } from 'utils/server/edge/http';

export const config = {
  runtime: 'edge',
};

const handler = function (request: NextRequest) {
  const ip = ipAddress(request) || 'unknown';
  const geo = geolocation(request);

  return responseJson200Success(request, {
    ip,
    ...geo,
  });
};

export default handler;
