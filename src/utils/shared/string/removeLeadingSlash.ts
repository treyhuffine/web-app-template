export const removeLeadingSlash = (str: string): string => {
  return str.startsWith('/') ? str.slice(1) : str;
};
