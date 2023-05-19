import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthStatus } from 'constants/auth';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useViewer } from 'hooks/useViewer';
// import ModalLogin from 'components/ModalLogin';
// import ModalSignup from 'components/ModalSignup';
import TransitionFadeIn from 'components/TransitionFadeIn';
import classNames from 'styles/utils/classNames';
import { ItemText } from './styles';

interface Props {
  aboveTabContent?: React.ReactNode;
  tabs?: {
    Icon: React.FC<{ className?: string }>;
    text: string;
    href: string;
  }[];
}

const TabBar: React.FC<Props> = ({ aboveTabContent, tabs = [] }) => {
  const router = useRouter();
  const viewer = useViewer();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);
  const { user, loading, called } = useCurrentUser();
  const isViewerLoaded = viewer.status !== AuthStatus.Loading;
  const isAnon = viewer.status === AuthStatus.Anonymous;
  const isUser = viewer.status === AuthStatus.User;
  const isAnonLoaded = isViewerLoaded;
  const isUserLoaded = isViewerLoaded && !loading && called;
  const isShowing = (isAnon && isAnonLoaded) || (isUser && isUserLoaded);

  let activeTabs = [];

  return (
    <>
      <div className="fixed bottom-0 left-0 z-20 w-screen lg:hidden">
        {aboveTabContent}
        <div className="bg-color-bg-lightmode-primary shadow-tabs w-full">
          <TransitionFadeIn className="flex h-full w-full items-center" isShowing={isShowing}>
            {isAnon ? (
              <div className="h-tabs flex w-full grow-0 items-center justify-around space-x-2 px-gutter-base">
                <div className="w-1/2">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="button-rounded-inline-brand-inverted w-full"
                  >
                    Log in
                  </button>
                </div>
                <div className="w-1/2">
                  <button
                    onClick={() => setIsSignupOpen(true)}
                    className="button-rounded-inline-primary w-full"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-tabs flex w-full grow-0 items-center justify-between">
                {activeTabs.map(({ text, href, Icon }) => {
                  const isActive = href === router.asPath;

                  return (
                    <Link key={text} href={href}>
                      <a
                        className={classNames(
                          `w-1/${activeTabs.length} h-full`,
                          isActive ? 'text-color-tab-active' : 'text-color-text-lightmode-inactive',
                        )}
                      >
                        <div className="flex h-full flex-col items-center justify-center text-center">
                          <Icon className="h-5 w-5" />
                          <ItemText className="text-2xs mt-1">{text}</ItemText>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            )}
          </TransitionFadeIn>
          <div className="safearea-spacer-bot"></div>
        </div>
      </div>
      {/* <ModalLogin isOpen={isLoginOpen} handleClose={() => setIsLoginOpen(false)} /> */}
      {/* <ModalSignup isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} /> */}
    </>
  );
};

export default TabBar;
