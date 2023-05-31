import * as React from 'react';
import Link from 'next/link';
import { AuthStatus } from 'constants/auth';
import {
  ABOUT_PAGE,
  BLOG_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MY_PROFILE_PAGE,
  ROOT_PAGE,
  SIGNUP_PAGE,
} from 'constants/pages';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useViewer } from 'hooks/useViewer';
// import ModalLogin from 'components/ModalLogin';
// import ModalSignup from 'components/ModalSignup';
import TransitionFadeIn from 'components/TransitionFadeIn';
import classNames from 'styles/utils/classNames';

interface Props {
  shouldShowAdditionalLinks?: boolean;
  shouldShowMobile?: boolean;
  shouldLinkToAuthPage?: boolean;
  shouldShowStartAction?: boolean;
  isBlur?: boolean;
}

const DISABLE_LINKS_UNTIL_LAUNCHED = true;

const TopNav = ({
  shouldShowAdditionalLinks,
  shouldShowMobile,
  shouldLinkToAuthPage,
  shouldShowStartAction,
  isBlur,
}: Props) => {
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

  return (
    <>
      <div className={classNames('w-full lg:block', shouldShowMobile ? 'block' : 'hidden')}>
        <div
          className={classNames(
            'h-topnav bg-color-bg-darkmode-primary fixed left-0 top-0 z-20 w-full',
            isBlur && 'bg-opacity-80 backdrop-blur-md',
          )}
        >
          <div className="flex h-full w-full items-center justify-between">
            <div className="h-full pl-8">
              <Link href={isUser ? HOME_PAGE : ROOT_PAGE}>
                <a>
                  <div className="flex h-full items-center">{/* <Logo className="h-6" /> */}</div>
                </a>
              </Link>
            </div>
            <div className="flex h-full items-center pr-8">
              <TransitionFadeIn className="flex h-full items-center" isShowing={isShowing}>
                {!!shouldShowAdditionalLinks && !DISABLE_LINKS_UNTIL_LAUNCHED && (
                  <>
                    <Link href={BLOG_PAGE}>
                      <a className="ml-8 hidden h-full items-center font-medium text-brand-blue-200 md:flex">
                        Blog
                      </a>
                    </Link>
                    <Link href={ABOUT_PAGE}>
                      <a className="ml-8 hidden h-full items-center font-medium text-brand-blue-200 md:flex">
                        About us
                      </a>
                    </Link>
                  </>
                )}
                {isAnon ? (
                  <div className="flex h-full items-center">
                    {shouldLinkToAuthPage ? (
                      <>
                        <Link href={LOGIN_PAGE}>
                          <a className="ml-8 hidden h-8 items-center justify-center border-transparent py-0 text-sm text-brand-blue-200 sm:flex">
                            Log in
                          </a>
                        </Link>
                        <Link href={SIGNUP_PAGE}>
                          <a className="button-rounded-inline-background-bold ml-10 h-8 w-28 items-center justify-center py-0 sm:flex">
                            Sign up
                          </a>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsLoginOpen(true)}
                          className="ml-8 hidden h-8 border-transparent py-0 text-sm text-brand-blue-200 sm:block"
                        >
                          Log in
                        </button>
                        <button
                          onClick={() => setIsSignupOpen(true)}
                          className="button-rounded-inline-background-bold ml-10 h-8 w-28 py-0"
                        >
                          Sign up
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center">
                    {!!shouldShowStartAction && (
                      <Link href={HOME_PAGE}>
                        <a className="button-rounded-inline-background-bold ml-4 mr-8 h-8 w-28 items-center justify-center py-0 text-sm sm:flex">
                          Get started
                        </a>
                      </Link>
                    )}
                    <Link href={MY_PROFILE_PAGE}>
                      <a>
                        <img className="h-8 w-8 rounded-full" src="" />
                      </a>
                    </Link>
                  </div>
                )}
              </TransitionFadeIn>
            </div>
          </div>
        </div>
        <div className={classNames('h-topnav w-full', isBlur && 'bg-color-bg-darkmode-primary')}>
          &nbsp;
        </div>
      </div>
      {/* <ModalLogin isOpen={isLoginOpen} handleClose={() => setIsLoginOpen(false)} /> */}
      {/* <ModalSignup isOpen={isSignupOpen} handleClose={() => setIsSignupOpen(false)} /> */}
    </>
  );
};

export default TopNav;
