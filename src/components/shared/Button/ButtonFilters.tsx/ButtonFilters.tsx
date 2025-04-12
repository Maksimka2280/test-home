import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { addFilter, removeFilter } from '../../../../store/FilterSlice/FilterSlices';

interface ButtonProps {
  children: ReactNode;
  rounded?: string;
  height?: string;
  width?: string;
  color?: 'blue' | 'red';
  onClick?: () => void;
  className?: string;
  id: string; // ID обязателен
  disabled?: boolean;
}

export const ButtonFilters: FC<ButtonProps> = ({
  children,
  rounded = '8px',
  height = '40px',
  width = 'auto',
  color = 'blue',
  onClick,
  className,
  id,
}) => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state: RootState) => state.filters.selectedFilters);
  const isActive = selectedFilters.includes(id);

  const handleClick = () => {
    if (isActive) {
      dispatch(removeFilter(id));
    } else {
      dispatch(addFilter(id));
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      id={id}
      className={clsx(
        'font-semibold flex items-center justify-center focus:outline-none transition-colors duration-300',
        className,
      )}
      style={{
        borderRadius: rounded,
        height,
        width,
        backgroundColor: isActive ? (color === 'blue' ? '#0164EB' : '#D11D04') : '#F3F3F3',
        color: isActive ? '#FFFFFF' : '#000000',
      }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
