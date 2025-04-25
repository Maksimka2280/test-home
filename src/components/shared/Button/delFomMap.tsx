import React from 'react';

interface TrashButtonProps {
  resetMarkersAndLine: () => void;
}

const TrashButton: React.FC<TrashButtonProps> = ({ resetMarkersAndLine }) => {
  return (
    <button
      onClick={resetMarkersAndLine}
      className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 text-red-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M9 6v12" />
        <path d="M15 6v12" />
        <path d="M3 6l3 12h12l3-12" />
      </svg>
    </button>
  );
};

export default TrashButton;
