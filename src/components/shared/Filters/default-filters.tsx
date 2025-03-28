import { FC } from 'react';
import { MiniGreyLine } from './mini-grey-line';
import { Text } from '@/components/ui';
import App from '@/components/ui/Modal/ModalOrder';
import PriceModal from '@/components/ui/Modal/PriceModal';

export const DefFilters: FC = () => {
  return (
    <div className="max-w-[700px] 2xl:max-w-[900px] w-full py-3 bg-[#f3f3f3] rounded-[15px] flex flex-wrap items-center px-3 sm:px-4 gap-3 sm:gap-6">
      {/* Модальное окно */}
      <div className="px-3 sm:px-5 w-full sm:w-auto flex justify-center">
        <App />
      </div>

      <MiniGreyLine />

      {/* Выбор количества студий */}
      <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2 sm:gap-10">
        <Text size="md" weight="normal" color="default">
          Студия
        </Text>
        <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-4">
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

      <div className="w-full sm:w-auto flex justify-center">
        <PriceModal />
      </div>
    </div>
  );
};
