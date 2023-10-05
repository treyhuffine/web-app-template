import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SwipeableProps, useSwipeable } from 'react-swipeable';
import classNames from 'styles/utils/classNames';

export interface ModalProps {
  isOpen: boolean;
  handleClose: (value?: boolean) => void;
  classNameRounded?: string;
  classNameMaxWidth?: string;
  classNamePosition?: string;
  classNameHeight?: string;
  className?: string;
  positionBottomDesktop?: boolean;
  swipeProps?: SwipeableProps;
  children: React.ReactNode;
}

export const EXIT_DURATION_MS = 200;
export const EXIT_DURATION_SAFE_MS = EXIT_DURATION_MS + 300;

// NOTE: How to handle widths and max widths??
const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  classNameRounded,
  classNameMaxWidth,
  classNamePosition,
  classNameHeight,
  className,
  swipeProps,
  positionBottomDesktop,
  children,
}) => {
  const swipeHandlers = swipeProps ? useSwipeable(swipeProps) : {};

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-30" onClose={handleClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div {...swipeHandlers} className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className={classNames(
              'flex min-h-full items-end justify-center',
              positionBottomDesktop ? 'sm:items-end' : 'sm:items-center',
              !!classNameHeight && classNameHeight,
            )}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={classNames(
                  'flex w-full items-center justify-center',
                  !!classNameHeight && classNameHeight,
                )}
              >
                <Dialog.Panel
                  className={classNames(
                    'bg-color-bg-lightmode-primary w-full transform overflow-hidden shadow-xl transition-all sm:my-8 sm:w-full',
                    classNameRounded ? classNameRounded : 'rounded-t-3xl sm:rounded-2xl',
                    classNamePosition ? classNamePosition : 'relative',
                    classNameMaxWidth ? classNameMaxWidth : 'sm:max-w-md',
                    !!className && className,
                  )}
                >
                  {children}
                  <div className="safearea-spacer-bot w-full"></div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
