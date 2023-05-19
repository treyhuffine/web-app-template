import React from 'react';
import SidebarNav from 'components/SidebarNav';
import TabBar from 'components/TabBar';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  ignoreSafeTop?: boolean;
}

const TabPageScrollPage: React.FC<Props> = ({ children, ignoreSafeTop = false }) => {
  return (
    <div
      className={classNames(
        'safearea-pad-bot flex h-full grow flex-col bg-color-bg-lightmode-primary',
        !ignoreSafeTop && 'safearea-pad-top',
      )}
    >
      <TopNav />
      <SidebarNav />
      <div className="flex h-full grow flex-col pb-tabs lg:pb-0 lg:pl-sidebar">{children}</div>
      <TabBar />
    </div>
  );
};

export default TabPageScrollPage;
