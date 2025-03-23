import { Text } from '@/components/ui';
import { FC } from 'react';

interface PopularSearchesProps {
  img: string;
  title: string;
  number: number;
}

export const PopularSearches: FC<PopularSearchesProps> = ({ img, title, number }) => {
  return (
    <div className="flex flex-col items-center flex-grow">
      {/* Контейнер с картинкой */}
      <div className="bg-[#f3f3f3] max-w-[250px] w-full h-[125px] rounded-[20px] flex justify-center items-center overflow-hidden">
        <img src={img} className="w-full h-full object-contain mt-[15px]" alt="img" />
      </div>


      {/* Текст под картинкой */}
      <div className="mt-2 flex items-center gap-2">
        <Text size="md" weight="normal" color="default">
          {title}
        </Text>
        <span className="font-semibold text-[#0164EB]">{number}</span>
      </div>
    </div>
  );
};
