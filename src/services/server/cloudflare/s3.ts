import { AwsClient } from 'aws4fetch';
import { MediaProviders } from 'constants/media';
import { removeLeadingSlash } from 'utils/shared/string/removeLeadingSlash';

const PROVIDER_KEY = MediaProviders.Cloudflare;
const USERS_BUCKET = 'users';
const VENUES_BUCKET = 'venues';
const CLOUDFLARE_S3_URL = process.env.CLOUDFLARE_S3_URL;

export const s3 = new AwsClient({
  accessKeyId: process.env.CLOUDFLARE_S3_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CLOUDFLARE_S3_SECRET_ACCESS_KEY!,
});

async function blobToArrayBuffer(body: BodyInit | null | undefined) {
  if (!body) {
    return null;
  }

  // @ts-ignore
  if (typeof body?.arrayBuffer === 'function') {
    console.log('--- HAS ARRAY BUFFER +++');
    // @ts-ignore
    return body.arrayBuffer();
  } else if (typeof FileReader !== 'undefined') {
    console.log('--- HAS FileReader +++');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      // @ts-ignore
      reader.readAsArrayBuffer(body);
    });
  } else {
    return null;
  }
}

interface UploadImageParams {
  path: string;
  fileName: string;
  body: BodyInit | null | undefined;
}

export const uploadImage = async ({ path, fileName, body }: UploadImageParams) => {
  if (!path) {
    throw new Error('URL path is required');
  }

  if (!fileName) {
    throw new Error('File name is required');
  }

  const host = CLOUDFLARE_S3_URL;
  const filePath = `/${process.env.CLOUDFLARE_IMAGES_BUCKET}/${removeLeadingSlash(
    path,
  )}/${fileName}`;

  const uploadUrl = `${host}${filePath}`;

  const payloadBody = await blobToArrayBuffer(body);

  if (!payloadBody) {
    throw new Error('No image data found');
  }

  const response = await s3.fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Length': payloadBody?.byteLength?.toString(),
    },
    body: payloadBody,
  });

  const url = `${process.env.CLOUDFLARE_PUBLIC_URL}${filePath}`;

  return {
    response,
    data: {
      path: filePath,
      fileName,
      host: process.env.CLOUDFLARE_PUBLIC_URL,
      url: url,
      provider: PROVIDER_KEY,
      providerUrl: url,
    },
  };
};

export const uploadVenueImage = async ({ fileName, body }: Omit<UploadImageParams, 'path'>) => {
  return uploadImage({ path: VENUES_BUCKET, fileName, body });
};

export const uploadUserImage = async ({ fileName, body }: Omit<UploadImageParams, 'path'>) => {
  return uploadImage({ path: USERS_BUCKET, fileName, body });
};

export const uploadTestImage = async ({ fileName, body }: Omit<UploadImageParams, 'path'>) => {
  return uploadImage({ path: 'test', fileName, body });
};

interface SignImageUploadParams {
  expirationSeconds?: string;
  path: string;
  fileName: string;
}

export const signImageUpload = async ({
  expirationSeconds = '3600',
  path,
  fileName,
}: SignImageUploadParams) => {
  if (!path) {
    throw new Error('URL path is required');
  }

  if (!fileName) {
    throw new Error('File name is required');
  }

  const uploadUrl = `${CLOUDFLARE_S3_URL}/${
    process.env.CLOUDFLARE_IMAGES_BUCKET
  }/${removeLeadingSlash(path)}/${fileName}`;

  const signed = await s3.sign(uploadUrl, {
    method: 'PUT',
    headers: {
      'X-Amz-Expires': expirationSeconds,
    },
  });

  return signed;
};
