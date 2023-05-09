import * as React from 'react';
import { SessionContext } from 'context/SessionContext';

export const useSession = () => {
  const session = React.useContext(SessionContext);
  return session;
};
