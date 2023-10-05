import { removeLeadingSlash } from './removeLeadingSlash';
import { removeTrailingSlash } from './removeTrailingSlash';

export const removeBoundSlash = (str: string = '') => {
  return removeLeadingSlash(removeTrailingSlash(str));
};
