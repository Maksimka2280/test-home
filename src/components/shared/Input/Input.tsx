'use client';

import { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  icon?: ReactNode;
  placeholder: string;
  type: string;
  maxWidth?: string;
  className?: string;
  onSearch?: (query: string) => void;
  showSearchButton?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name?: string; // Делать name необязательным
}

export const Input: FC<InputProps> = ({
  icon,
  placeholder,
  type,
  maxWidth = 'max-w-lg',
  className = '',
  onSearch,
  showSearchButton = true,
  value = '',
  onChange,
  onKeyDown,
  name, // name пропс
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        name={name}
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        className="outline-none flex-1 bg-transparent text-[#9D9D9D] text-[20px] overflow-hidden min-w-20"
      />

      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="ml-4 text-[#9D9D9D] hover:text-black"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}

      {type === 'search' && showSearchButton && (
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
