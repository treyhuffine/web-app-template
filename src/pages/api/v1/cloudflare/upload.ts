import { captureException } from '@sentry/nextjs';
import { type PageConfig } from 'next';
import { v4 as uuid } from 'uuid';
import { HttpMethods } from 'constants/http';
// import { PostResponsePayload } from 'constants/payloads/cfUpload';
import { uploadTestImage } from 'services/server/cloudflare/s3';
import {
  response400BadRequestError,
  response500ServerError,
  responseJson200Success,
} from 'utils/server/edge/http';
import { withHttpMethods } from 'utils/server/edge/middleware/withHttpMethods';
import {
  type NextApiRequestWithViewerRequired,
  withViewerDataRequired,
} from 'utils/server/edge/middleware/withViewerDataRequired';

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
  runtime: 'edge',
};

const extensions = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/tiff': '.tiff',
  'image/bmp': '.bmp',
};

type MimeType = keyof typeof extensions;

const getFileExtensionForMimeType = (mimeType: MimeType) => {
  const extension = extensions[mimeType] || '';

  return extension;
};

const getFileExtension = ({ fileName, mimeType }: { fileName: string; mimeType: MimeType }) => {
  const fileExtension = fileName.split('.').pop() || '';
  if (fileExtension) {
    return fileExtension;
  }

  return getFileExtensionForMimeType(mimeType);
};

const POST = async (req: NextApiRequestWithViewerRequired) => {
  try {
    const payload = await req.formData();

    console.log('payload', payload);

    /**
     * @todo How do I attach this to a group or user?
     */

    const file = payload.get('file') as File;
    const fileType = file.type;

    const extension = getFileExtension({
      fileName: file.name,
      mimeType: fileType as MimeType,
    });
    const uploadResponse = await uploadTestImage({
      body: file,
      fileName: uuid() + (extension ? `.${extension}` : ''),
    });

    return responseJson200Success(req, {
      ...uploadResponse,
      data: { ...uploadResponse.data, fileType },
    });
    // return responseJson200Success<PostResponsePayload>(req, data);
  } catch (e) {
    captureException(e);
    console.log(e);
    // @ts-ignore
    return response500ServerError(req, `Internal Server Error, ${e.message}`);
  }
};

export default withHttpMethods({
  [HttpMethods.Post]: withViewerDataRequired(POST),
});
