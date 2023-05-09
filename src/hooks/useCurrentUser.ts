import * as React from 'react';
import { CurrentUserContext } from 'context/CurrentUserContext';

export const useCurrentUser = () => {
  const response = React.useContext(CurrentUserContext);
  return response.currentUser || { user: null, loading: false, called: false };
};
