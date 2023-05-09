import * as React from 'react';

// import VConsole from 'vconsole';

const DEFAULT_STATE = {
  isVirtualConsoleEnabled: process.env.VIRTUAl_CONSOLE_DEFAULT_ENABLED === 'true',
  setIsVirtualConsoleEnabled: (_isVirtualConsoleEnabled: boolean) => {},
  removeInstance: () => {},
};

export const VirtualConsoleContext = React.createContext(DEFAULT_STATE);

export const VirtualConsoleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isVirtualConsoleEnabled, setIsVirtualConsoleEnabled] = React.useState(
    DEFAULT_STATE.isVirtualConsoleEnabled,
  );
  const [virtualConsoleInstance, setVirtualConsoleInstance] = React.useState<any>(null);
  const removeInstance = React.useCallback(() => {
    if (virtualConsoleInstance) {
      virtualConsoleInstance.destroy();
      setVirtualConsoleInstance(null);
    }
  }, [virtualConsoleInstance]);

  React.useEffect(() => {
    const addInstance = async () => {
      if (isVirtualConsoleEnabled && !virtualConsoleInstance && typeof window !== 'undefined') {
        const VConsole = (await import('vconsole')).default;
        const vConsole = new VConsole({ theme: 'dark' });
        setVirtualConsoleInstance(vConsole);
      }
    };
    addInstance();
  }, [isVirtualConsoleEnabled, virtualConsoleInstance]);

  return (
    <VirtualConsoleContext.Provider
      value={{ isVirtualConsoleEnabled, setIsVirtualConsoleEnabled, removeInstance }}
    >
      {children}
    </VirtualConsoleContext.Provider>
  );
};
