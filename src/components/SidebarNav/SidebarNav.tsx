import React from 'react';
import { useRouter } from 'next/router';
import { AuthStatus } from 'constants/auth';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useViewer } from 'hooks/useViewer';
// import ModalLogin from 'components/ModalLogin';
// import ModalSignup from 'components/ModalSignup';
import TransitionFadeIn from 'components/TransitionFadeIn';
import classNames from 'styles/utils/classNames';
import SidebarItem from './SidebarItem';

interface Props {
  isTopNavHidden?: boolean;
}

const getSidebarItems = () => {
  return [];
};

const SidebarNav: React.FC<Props> = ({ isTopNavHidden }) => {
  const viewer = useViewer();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);
  const { user, loading, called } = useCurrentUser();
  const sidebarItems = getSidebarItems();
  const isViewerLoaded = viewer.status !== AuthStatus.Loading;
  const isAnon = viewer.status === AuthStatus.Anonymous;
  const isUser = viewer.status === AuthStatus.User;
  const isAnonLoaded = isViewerLoaded;
  const isUserLoaded = isViewerLoaded && !loading && called;
  const isShowing = (isAnon && isAnonLoaded) || (isUser && isUserLoaded);

  return (
    <>
      <div
        className={classNames(
          'w-sidebar bg-color-bg-lightmode-primary shadow-sidebar fixed bottom-0 left-0 z-30 hidden px-4 py-4 lg:block',
          isTopNavHidden ? 'h-screen' : 'h-[calc(100vh-theme(height.topnav))]',
        )}
      >
        <div className="flex h-full flex-col">
          <TransitionFadeIn isShowing={isShowing} className="flex h-full flex-col">
            {isAnon ? (
              <div className="flex h-full flex-col space-y-3">
                <button onClick={() => setIsSignupOpen(true)} className="button-rounded-full-brand">
                  Sign up
                </button>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="button-rounded-full-brand-inverted"
                >
                  Log in
                </button>
              </div>
            ) : (
              <div className="flex h-full flex-col space-y-2">
                {sidebarItems.map(({ text, href, Icon }) => {
                  const isActive = href === router.asPath;
                  return (
                    <SidebarItem
                      key={text}
                      text={text}
                      href={href}
                      icon={<Icon className="w-full" />}
                      isActive={isActive}
                    />
                  );
                })}
              </div>
            )}
          </TransitionFadeIn>
        </div>
      </div>
      {/* <ModalLogin isOpen={isLoginOpen} handleClose={() => setIsLoginOpen(false)} /> */}
      {/* <ModalSignup isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} /> */}
    </>
  );
};

export default SidebarNav;
