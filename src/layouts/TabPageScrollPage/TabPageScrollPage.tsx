import React from 'react';
import SidebarNav from 'components/SidebarNav';
import TabBar from 'components/TabBar';
import TopNav from 'components/TopNav';
import classNames from 'styles/utils/classNames';

interface Props {
  children: React.ReactNode;
  ignoreSafeTop?: boolean;
}

const TabPageScrollPage = ({ children, ignoreSafeTop = false }: Props) => {
  return (
    <div
      className={classNames(
        'safearea-pad-bot bg-color-bg-lightmode-primary flex h-full grow flex-col',
        !ignoreSafeTop && 'safearea-pad-top',
      )}
    >
      <TopNav />
      <SidebarNav />
      <div className="pb-tabs lg:pl-sidebar flex h-full grow flex-col lg:pb-0">{children}</div>
      <TabBar />
    </div>
  );
};

export default TabPageScrollPage;
