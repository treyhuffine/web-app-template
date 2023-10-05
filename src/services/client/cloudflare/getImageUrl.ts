interface GetImageUrlParams {
  path: string;
  url: string;
}

/**
 * @note for now just using the URL, but we could derive it in case there are changes to the API not reflected in other places.
 * All we would need is a consistent file name and then host and path to the file.
 */
export const getImageUrl = ({ url }: GetImageUrlParams) => {
  return url;
};
