import { FC } from 'react';
import { MiniGreyLine } from './mini-grey-line';
import { Text } from '@/components/ui';
import App from '@/components/ui/Modal/ModalOrder';
import PriceModal from '@/components/ui/Modal/PriceModal';

export const DefFilters: FC = () => {
  return (
    <div className="max-w-[700px] h-[60px] bg-[#f3f3f3] rounded-[15px] flex flex-wrap items-center px-4 flex-grow">
      <div className="px-[20px]">
        <App />
      </div>

      <MiniGreyLine />

      <div className="flex items-center gap-[40px] px-[40px]">
        <Text size="md" weight="normal" color="default">
          Студия
        </Text>
        <div className="flex gap-4">
          <button className="text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            1
          </button>
          <button className="text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            2
          </button>
          <button className="text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            3
          </button>
          <button className="text-sm font-semibold text-gray-800 hover:text-blue-600 focus:outline-none">
            4+
          </button>
        </div>
      </div>

      <MiniGreyLine />

      <div className="pl-[25px]">
        <PriceModal />
      </div>
    </div>
  );
};
