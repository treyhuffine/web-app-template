import * as React from 'react';
import SidebarNav from 'components/SidebarNav';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  isHideSidebar?: boolean;
  isIgnoreMobileTabs?: boolean;
}

const TabPageScrollChild = ({ isHideSidebar, children }: Props) => {
  return (
    <div className="safearea-pad-top h-safe-screen bg-color-bg-lightmode-primary pb-tabs flex grow flex-col overflow-hidden lg:pb-0">
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
