import * as React from 'react';
import SidebarNav from 'components/SidebarNav';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  isHideSidebar?: boolean;
  isIgnoreMobileTabs?: boolean;
}

const TabPageScrollChild: React.FC<Props> = ({ isHideSidebar, children }) => {
  return (
    <div className="safearea-pad-top h-safe-screen flex grow flex-col overflow-hidden bg-color-bg-lightmode-primary pb-tabs lg:pb-0">
      <TopNav />
      {!isHideSidebar && <SidebarNav />}
      <div
        className={classNames(
          'flex h-full grow flex-col overflow-hidden lg:pb-0',
          !isHideSidebar && 'lg:pl-sidebar',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default TabPageScrollChild;
