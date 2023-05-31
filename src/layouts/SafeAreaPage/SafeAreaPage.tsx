import * as React from 'react';
import SidebarNav from 'components/SidebarNav';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  isHideSidebar?: boolean;
  isIgnoreMobileTabs?: boolean;
}

const SafeAreaPage = ({ children, isHideSidebar, isIgnoreMobileTabs }: Props) => {
  return (
    <div className="safearea-pad-y bg-color-bg-lightmode-primary flex h-full grow flex-col">
      <TopNav />
      {!isHideSidebar && <SidebarNav />}
      <div
        className={classNames(
          'flex h-full grow flex-col lg:pb-0',
          !isIgnoreMobileTabs && 'pb-tabs',
          !isHideSidebar && 'lg:pl-sidebar',
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SafeAreaPage;
