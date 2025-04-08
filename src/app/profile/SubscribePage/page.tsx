import { Button } from '@/components/shared/Button/Button';
import { Lock } from 'lucide-react';

export default function SubscribePage() {
  return (
    <div className="flex flex-wrap justify-start gap-[40px] px-4 py-10">
      {/* Без подписки */}
      <div className="w-full max-w-[325px] flex flex-col text-center gap-[30px] text-[18px] sm:text-[20px]">
        <div>
          <Button color="red" width="100%" rounded="20px" height="88px">
            Без подписки
          </Button>
        </div>
        <h1 className="font-bold">10 CHF (11$) / месяц</h1>
        <p>Доступ ко всем объявлениям</p>
        <p className="text-[#BCBCBC]">Возможность создать до 3 папок избранное</p>
        <p className="text-[#BCBCBC]">Стандартный вид карточки объявления</p>
        <p className="text-[#BCBCBC]">Возможность сравнивать объекты без кастомизации</p>
      </div>

      {/* Подписка */}
      <div className="w-full max-w-[325px] flex flex-col text-center gap-[30px] text-[18px] sm:text-[20px]">
        <div>
          <Button color="blue" width="100%" rounded="20px" height="88px">
            Подписка
          </Button>
        </div>
        <h1 className="font-bold">10 CHF (11$) / месяц</h1>
        <p>Доступ ко всем объявлениям</p>
        <p>Разбивка избранное на папки без ограничения</p>
        <p>Гибкая кастомизация карточки объявления</p>
        <p>Возможность настраивать фильтры в разделе сравнении</p>
        <p>Возможность отслеживать изменение цены на объявлении</p>
      </div>

      {/* Скоро */}
      <div className="w-full max-w-[325px] flex flex-col text-center gap-[30px] text-[18px] sm:text-[20px]">
        <div>
          <button className="w-full flex justify-center items-center gap-[10px] font-bold h-[88px] rounded-[20px] bg-white text-[#0468FF] ">
            Скоро
            <Lock color="#0468FF" size={18} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
