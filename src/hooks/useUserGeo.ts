import * as React from 'react';
import { CurrentUserContext } from 'context/CurrentUserContext';

export const useUserGeo = () => {
  const currentUser = React.useContext(CurrentUserContext);
  return currentUser.geo;
};
