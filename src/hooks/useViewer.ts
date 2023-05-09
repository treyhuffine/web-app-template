import * as React from 'react';
import { CurrentUserContext } from 'context/CurrentUserContext';
import { SessionContext } from 'context/SessionContext';

export const useViewer = () => {
  const session = React.useContext(SessionContext);
  const currentUser = React.useContext(CurrentUserContext);
  const viewer = { ...session, ...currentUser };

  return viewer;
};
