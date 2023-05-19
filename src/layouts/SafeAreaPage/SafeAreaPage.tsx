import * as React from 'react';
import SidebarNav from 'components/SidebarNav';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  isHideSidebar?: boolean;
  isIgnoreMobileTabs?: boolean;
}

const SafeAreaPage: React.FC<Props> = ({ children, isHideSidebar, isIgnoreMobileTabs }) => {
  return (
    <div className="safearea-pad-y flex h-full grow flex-col bg-color-bg-lightmode-primary">
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
