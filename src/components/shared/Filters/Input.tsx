'use client';

import { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';

interface InputProps {
  icon?: ReactNode;
  placeholder: string;
  type: string;
  maxWidth?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export const Input: FC<InputProps> = ({
  icon,
  placeholder,
  type,
  maxWidth = 'max-w-lg',
  className = '',
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center bg-[#f3f3f3] h-[70px] rounded-[15px] px-3 py-2 w-full',
        className,
      )}
      style={{ maxWidth }}
    >
      {icon && <span className="mr-4">{icon}</span>}

      <input
        type={type}
        placeholder={placeholder}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="outline-none flex-1 bg-transparent text-[#9D9D9D] text-[20px] overflow-hidden min-w-20"
      />

      {type === 'search' && (
        <button
          className="bg-[#0164EB] w-[202px] h-[50px] rounded-[10px] text-[#fff]"
          onClick={handleSearchClick}
        >
          Найти
        </button>
      )}
    </div>
  );
};
