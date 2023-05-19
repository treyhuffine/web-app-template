// 2022-08-12
// - Between 4 and 28 characters (1 alphanumeric at the front, 1 in the back, and 2-26 of allows characters in the middle)
// - Underscores are the only special character
// - Underscores can't repeat
// - Underscores can't be at the beginning or end
// - We'll let them use capitals in the input, but going to the database, it will be transformed to lowercase
export const USERNAME_REGEX = /^[a-z0-9]([_](?![_])|[a-z0-9]){2,26}[a-z0-9]$/;
export const USERNAME_REGEX_CASE_INSENSITIVE = /^[a-z0-9]([_](?![_])|[a-z0-9]){2,26}[a-z0-9]$/i;
const MINIMUM_USERNAME_LENGTH = 4;
const MAXIMUM_USERNAME_LENGTH = 28;

export const getIsValidUsernameFormat = (username: string) => {
  return (
    username.length >= MINIMUM_USERNAME_LENGTH &&
    username.length <= MAXIMUM_USERNAME_LENGTH &&
    USERNAME_REGEX.test(username)
  );
};
