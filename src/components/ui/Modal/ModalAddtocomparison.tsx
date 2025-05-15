import { useEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/config';
import { ChevronDown } from 'lucide-react';

type CategoryItem = {
  id: number;
  name: string;
};

type Categories = {
  Info: CategoryItem[];
};

interface ModalAddToComparisonProps {
  advertId: string | number;
}

export const ModalAddToComparison: React.FC<ModalAddToComparisonProps> = ({ advertId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory] = useState<keyof Categories>('Info');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [categories, setCategories] = useState<Categories>({ Info: [] });
  // const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null); // Состояние для выбранной группы
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get_user_info/`, {
          withCredentials: true,
        });
        const data = response.data as { favorite_groups: { id: number; name: string }[] };
        const Groupe = data.favorite_groups;

        const transformedCategories: Categories = {
          Info: Groupe.map(group => ({
            id: group.id,
            name: group.name,
          })),
        };

        setCategories(transformedCategories);
      } catch (error) {
        console.error('Ошибка при получении групп:', error);
      }
    };

    void fetchGroups();
  }, []);

  const handleCheckboxChange = (id: number, groupId: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );

    if (!selectedItems.includes(id)) {
      // setSelectedGroupId(groupId);
      void sendToGroup(groupId, advertId);
    } else {
      void removeFromGroup(groupId, advertId);
    }
  };
  const sendToGroup = async (groupId: number, advertId: string | number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorite_groups/add_to_favorite_group/${groupId}`,
        {
          id: advertId,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('❌ Ошибка при добавлении:', error.response?.data || error.message);
      } else {
        console.error('❌ Неизвестная ошибка при добавлении:', error);
      }
    }
  };

  const removeFromGroup = async (groupId: number, advertId: string | number) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorite_groups/remove_from_favorite_group/${groupId}`,
        { advertId },
        { withCredentials: true },
      );
      console.log('Карточка удалена из группы:', response.data);
    } catch (error) {
      console.error('Ошибка при удалении карточки из группы:', error);
    }
  };

  const toggleModal = () => setIsOpen(prev => !prev);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center justify-center gap-1 text-base font-semibold bg-[#0164EB] text-white w-[190px] h-[30px] rounded-[10px]"
        onClick={toggleModal}
      >
        <span className="text-[14px]">Добавить в сравнение</span>
        <ChevronDown
          size={15}
          strokeWidth={3}
          color="#fff"
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full transform -translate-x-1/2 mt-[10px] w-max min-w-[275px] ml-[95px] z-2
          bg-white rounded-[17px] shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <ul className="flex flex-col ml-[18px] mt-[20px] mb-4">
          <li key="group-title" className="font-bold text-[#1A1A1A] text-[13px] my-[10px]">
            Группа
          </li>

          {categories[activeCategory].map(item => (
            <li key={item.id} className="flex items-center justify-between w-full mb-[15px]">
              <span
                onClick={() => handleCheckboxChange(item.id, item.id)}
                className="text-[13px] cursor-pointer text-[#A7A7A7]"
              >
                {item.name}
              </span>

              <input
                type="checkbox"
                name="categoryItem"
                value={item.id.toString()}
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id, item.id)}
                className="hidden"
                id={item.id.toString()}
              />

              <label
                htmlFor={item.id.toString()}
                className="w-[17px] h-[17px] flex items-center justify-center rounded-[5px] bg-[#F3F3F3] cursor-pointer transition-all duration-300 mr-[17px]"
              >
                {selectedItems.includes(item.id) && (
                  <div className="w-[8px] h-[8px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                )}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
