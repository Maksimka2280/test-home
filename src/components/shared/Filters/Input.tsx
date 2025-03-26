import { FC, ReactNode } from 'react';
import { Button } from '../Button/Button';

interface InputProps {
  icon?: ReactNode;
  placeholder: string;
  type: string;
  maxWidth?: string;
}

export const Input: FC<InputProps> = ({ icon, placeholder, type, maxWidth = 'max-w-lg' }) => {
  return (
    <div
      className={
        'flex items-center justify-center bg-[#f3f3f3] h-[70px] rounded-[15px] px-3 py-2 w-full'
      }
      style={{ maxWidth }}
    >
      {icon && <span className="mr-4">{icon}</span>}

      <input
        type={type}
        placeholder={placeholder}
        className="outline-none flex-1 bg-transparent text-[#9D9D9D] text-[20px]  overflow-hidden min-w-20"
      />

      {type === 'search' && (
        <Button color="blue" width="202px" rounded="10px" height="50px" >
          Найти
        </Button>
      )}
    </div>
  );
};
