export enum MediaProviders {
  ImageKit = 'IMAGE_KIT',
  Cloudflare = 'CLOUDFLARE',
}

export const IMAGE_PATH = 'images';
export const DEV_IMAGE_KEY = 'staging';

export const OG_PIXEL_WIDTH = 1200;
export const OG_PIXEL_HEIGHT = 630;

export interface MediaUploadResponse {
  fileType: string;
  originalFileName: string;
  path: string;
  fileName: string;
  host: string | undefined;
  url: string;
  provider: string;
  providerUrl: string;
}
