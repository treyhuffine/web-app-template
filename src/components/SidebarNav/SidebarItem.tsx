import React from 'react';
import Link from 'next/link';
import classNames from 'styles/utils/classNames';

interface Props {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}

const SidebarItem: React.FC<Props> = ({ href, icon, text, isActive }) => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          'flex items-center rounded-md py-2 px-4 transition-colors hover:bg-brand-blue-100',
          isActive && 'bg-brand-blue-200 hover:bg-brand-blue-200',
        )}
      >
        <span
          className={classNames(
            'w-6',
            isActive ? 'text-brand-blue-700' : 'text-color-text-lightmode-inactive',
          )}
        >
          {icon}
        </span>
        <span
          className={classNames(
            'ml-3.5',
            isActive ? 'font-medium text-brand-blue-700' : 'text-color-text-lightmode-title',
          )}
        >
          {text}
        </span>
      </a>
    </Link>
  );
};

export default SidebarItem;
