import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/shared/Button/Button';
import { ModalCard } from '@/types/ModalLayers';

interface ModalEditingEquastionsProps {
  isOpen: boolean;
  onClose: () => void;
  card: ModalCard | null;
  onDeleteRow: (rowId: string, field: string) => void;
  resetCardFields: any;
}

type DefaultItem = {
  id: string;
  label: string;
  field: string;
};

export default function ModalEditingEquastions({
  isOpen,
  onClose,
  card,
  onDeleteRow,
  resetCardFields,
}: ModalEditingEquastionsProps) {
  const [currentPage] = useState(0);
  const [items, setItems] = useState<{ label: string; field: string; id: string }[]>([]);

  const images = ['/img/image123.png', '/img/room-test.png'];
  const modalRef = useRef<HTMLDivElement | null>(null);

  const getDefaultItems = (): DefaultItem[] => {
    if (!card) return [];

    return [
      {
        id: 'roomCount',
        label: `Количество комнат: ${card.roomCount ?? 'Не указано'}`,
        field: 'roomCount',
      },
      {
        id: 'area',
        label: `Общая площадь: ${card.area ?? 'Не указана'} м²`,
        field: 'area',
      },
      {
        id: 'floor',
        label: `Этаж: ${card.floor ?? 'Не указан'}/${card.totalFloors ?? 'Не указано'}`,
        field: 'floor',
      },
      {
        id: 'metroDistance',
        label: `До метро: ${card.metroDistance ?? 'Не указано'}`,
        field: 'metroDistance',
      },
      {
        id: 'mortgage',
        label: `Ипотечные программы: ${card.mortgage ? 'есть' : 'нет'}`,
        field: 'mortgage',
      },
      {
        id: 'renovation',
        label: `Ремонт: ${card.renovation ?? 'Не указан'}`,
        field: 'renovation',
      },
      {
        id: 'year',
        label: `Год постройки: ${card.year ?? 'Не указан'}`,
        field: 'year',
      },
      {
        id: 'buildingType',
        label: `Тип дома: ${card.buildingType ?? 'Не указан'}`,
        field: 'buildingType',
      },
      {
        id: 'balcony',
        label: `Балкон/терраса: ${card.balcony ? 'есть' : 'нет'}`,
        field: 'balcony',
      },
      {
        id: 'elevator',
        label: `Лифт: ${card.elevator ? 'есть' : 'нет'}`,
        field: 'elevator',
      },
      {
        id: 'stove',
        label: `Кухонная плита: ${card.stove ?? 'Не указано'}`,
        field: 'stove',
      },
      {
        id: 'bathroomCount',
        label: `Санузел: ${card.bathroomCount ?? 'Не указан'}`,
        field: 'bathroomCount',
      },
      {
        id: 'view',
        label: `Вид из окна: ${card.view ?? 'Не указан'}`,
        field: 'view',
      },
      {
        id: 'seller',
        label: `Продавец: ${card.seller ?? 'Не указан'}`,
        field: 'seller',
      },
      {
        id: 'sellerRating',
        label: `Рейтинг продавца: ${card.sellerRating ?? 'Не указан'}`,
        field: 'sellerRating',
      },
    ];
  };

  // Обновляем items при изменении card
  useEffect(() => {
    setItems(getDefaultItems());
  }, [card]);

  // Обработчик клика за пределами модального окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const removeItem = (index: number) => {
    const field = items[index].field;
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
    if (card?.id) {
      onDeleteRow(card.id, field);
    }
  };

  const resetItems = () => {
    setItems(getDefaultItems());
    if (card?.id) {
      resetCardFields(card.id);
    }
  };

  // Если модальное окно не открыто, возвращаем null
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[50]">
      <div
        ref={modalRef}
        className="max-w-[400px] w-full bg-white rounded-[20px] shadow-lg p-5 sm:max-w-[350px] transition-all duration-300 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-1 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <div className="rounded-t-[20px] flex justify-center items-center relative group">
          <img
            className="max-w-[424px] w-full h-[160px] sm:h-[240px] rounded-[20px]"
            src={images[currentPage]}
            alt="Пример изображения"
          />
        </div>

        <div className="text-left flex flex-col gap-[3px] px-[10px] text-[12px] mt-5">
          <div className="font-bold text-[14px]">Информация:</div>

          {items.map((item, index) => (
            <div key={item.id} className="flex justify-between items-center py-1">
              <span>{item.label}</span>
              <button
                onClick={() => removeItem(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2 justify-center items-center mt-[10px]">
          <Button width="310px" height="50px" rounded="15px" color="red" onClick={resetItems}>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
}
