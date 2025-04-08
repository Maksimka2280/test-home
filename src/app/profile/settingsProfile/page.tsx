import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import ChangeNumber from '@/components/ui/Modal/ChangeNumber/ChangeNumber';

export default function settingsProfile() {
  return (
    <div className="flex flex-col lg:flex-row gap-[20px] w-full">
      <div className="w-full lg:max-w-[510px] rounded-[20px] bg-white px-[20px] py-[23px]">
        <div className="flex gap-[10px] items-center mb-[20px]">
          <div className="w-[63px] h-[63px] rounded-full bg-orange-400"></div>
          <div className="font-bold">
            <p>Фамилия Имя</p>
            <p>ID: 99999999</p>
          </div>
        </div>

        <form className="flex flex-col gap-[13px] w-full max-w-[463px]">
          <Input placeholder="Имя пользователя" height="50px" type="text" />
          <Input placeholder="Фамилия" height="50px" type="text" />
          <Input placeholder="Дата рождения" height="50px" type="date" />
        </form>

        <div className="flex flex-col sm:flex-row gap-[15px] mt-[20px]">
          <Button width="100%" height="65px" rounded="15px" color="blue">
            Сохранить изменения
          </Button>
          <Button width="100%" height="65px" rounded="15px" color="red">
            Сбросить
          </Button>
        </div>
      </div>

      <div className="w-full lg:max-w-[480px] rounded-[20px] bg-white px-[20px] py-[23px] ">
        {/* Номер телефона */}
        <div className="mb-[20px]">
          <p className="text-[14px] font-medium text-black flex items-center gap-[6px]">
            Номер телефона <span className="text-green-600 text-[18px]">✔</span>
          </p>
          <p className="text-[16px] font-bold mt-[4px]">+7 (996) 999 99 99</p>
          <ChangeNumber />
        </div>

        <hr className="border-t border-gray-200 mb-[20px]" />

        {/* Почта */}
        <div className="mb-[20px]">
          <p className="text-[14px] font-medium text-black mb-[6px] flex items-center gap-[8px]">
            Почта
            <span className="bg-[#D60000] text-white text-[12px] rounded-[4px] px-[8px] py-[2px]">
              Не подтверждено
            </span>
          </p>
          <p className="text-[16px] font-bold break-words">den.shestakov2020den@gmail.com</p>

          <button className="text-[#0077FF] text-[14px] mt-[4px] hover:underline text-left">
            Отправить ссылку для подтверждения
          </button>
        </div>

        <hr className="border-t border-gray-200 mb-[20px]" />

        {/* Город */}
        <div>
          <p className="text-[14px] font-medium text-black flex items-center gap-[6px]">
            Город проживания <span className="text-green-600 text-[18px]">✔</span>
          </p>
          <p className="text-[16px] font-bold mt-[4px]">Берн</p>
          <button className="text-[#0077FF] text-[14px] mt-[4px] hover:underline">
            Сменить город
          </button>
        </div>
      </div>
    </div>
  );
}
