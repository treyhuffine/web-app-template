import React, { FunctionComponent } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';

const DEFAULT_DESCRIPTION = '<todo>';
const DEFAULT_IMAGE = `${process.env.APP_URL}/social-share.jpg`;

interface Props {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  preventBrandTitle?: boolean;
  useCurrentUrl?: boolean;
  noIndex?: boolean;
}

const addBrandTitle = (title?: string) => `${title} | <brand name>`;

const getTitle = (title?: string, preventBrandTitle?: boolean) => {
  if (!title) {
    return '';
  }

  return preventBrandTitle ? title : addBrandTitle(title);
};

const getCurrentUrl = () => {
  const router = useRouter();

  return `${process.env.APP_URL}${router.asPath}`;
};

const getUrl = (url?: string, useCurrentUrl?: boolean) => {
  if (!url && !useCurrentUrl) {
    return '';
  }

  return useCurrentUrl ? getCurrentUrl() : url;
};

const Head: FunctionComponent<Props> = ({
  title,
  description,
  url,
  ogImage,
  useCurrentUrl,
  preventBrandTitle,
  noIndex,
}) => {
  const finalTitle = getTitle(title, preventBrandTitle);
  const finalUrl = getUrl(url, useCurrentUrl);

  return (
    <NextHead>
      {(noIndex || process.env.APP_STAGE !== 'production') && (
        <meta name="robots" content="noindex" />
      )}

      <title>{finalTitle}</title>
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description || DEFAULT_DESCRIPTION} />
      <meta property="og:image" content={ogImage || DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description || DEFAULT_DESCRIPTION} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || DEFAULT_IMAGE} />
    </NextHead>
  );
};

export default Head;
