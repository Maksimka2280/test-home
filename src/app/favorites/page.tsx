'use client';

import { useCurrency } from '@/components/Context/Contextcurrency/Contextcurrency';
import { MiniGreyButton } from '@/components/shared/Button/MinigreyButton/MinigreyButton';
import CustomOrder from '@/components/ui/Modal/ModalCustomOrder';
import NewGroup from '@/components/ui/Modal/ModalNewGroup';
import { List, Plus, CornerUpRight, Pencil, Download, TriangleAlert, FolderClosed, FolderOpen, EyeOff, MapPin, Timer } from 'lucide-react';
import { useState } from 'react';

export default function Favorites() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { currencySymbol } = useCurrency();
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className='mt-[50px]'>
            <div className='max-w-[1440px] 2xl:max-w-[1750px] w-full mx-auto'>
                <div className="flex justify-center xl:justify-start gap-12">
                    {['Объявления', 'Жилые комплексы', 'Агентства'].map((btn, index) => (
                        <button
                            key={index}
                            className={`text-[#152242] ${selected === btn ? 'font-bold' : ''}`}
                            onClick={() => setSelected(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
                <div className='flex flex-wrap items-center justify-center xl:justify-between mt-[35px]  '>
                    <div className='flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-10 lg:gap-[50px]'>
                        <div className='w-[225px] sm:w-[245px] h-[80px] rounded-[10px] bg-[#fff] flex gap-4 md:gap-[20px] justify-center items-center shadow-md'>
                            <div className='w-[45px] md:w-[55px] h-[45px] md:h-[55px] bg-[#F3F3F3] rounded-[10px] flex justify-center items-center'>
                                <List size={20} />
                            </div>
                            <div>
                                <p className='font-bold text-[14px] md:text-[16px]'>Все объявления</p>
                                <p className='text-[12px] md:text-[14px]'>20 объявлений</p>
                            </div>
                        </div>

                        <div className='text-center sm:text-left'>
                            <h1 className='text-[24px] md:text-[30px] lg:text-[33px] font-bold mb-[10px]'>Все объявления</h1>
                            <div className='flex flex-wrap gap-4 md:gap-6 lg:gap-[40px] justify-center lg:justify-start'>
                                <p>По дате добавления</p>
                                <p>Фильтры</p>
                                <p>Кастомизировать объявление</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-row flex-wrap items-center gap-4 md:gap-6 lg:gap-[25px] mt-[20px] xl:mt-[0]'>
                        <input
                            type='checkbox'
                            id='price-checkbox'
                            className='hidden'
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor='price-checkbox'
                            className='w-[15px] md:w-[17px] h-[15px] md:h-[17px] flex items-center justify-center rounded-[5px] bg-[#ffffff] cursor-pointer transition-all duration-300'
                        >
                            {isChecked && (
                                <div className='w-[8px] md:w-[10px] h-[8px] md:h-[10px] bg-[#0468FF] rounded-[3px] transition-all duration-300'></div>
                            )}
                        </label>
                        <p className='text-[14px] md:text-[16px]'>20 объявлений</p>
                        <button className='border-none text-[#0468FF] lg:ml-[20px] md:ml-[40px] text-[14px] md:text-[16px]'>Удалить все</button>
                    </div>
                </div>

                <div className='flex justify-center xl:justify-start flex-wrap gap-[45px]'>
                    <div>
                        <p className='py-[15px] pt-[40px] xl:pt-[15px] text-center xl:text-left'>Мои группы</p>
                        <ul>
                            <li>
                                <div className='w-[245px] h-[80px] pr-[20px] rounded-[10px] bg-[#0468FF] flex gap-[20px] justify-center items-center'>
                                    <div
                                        className='w-[55px] h-[55px] bg-[#F3F3F3] rounded-[10px] flex justify-center items-center cursor-pointer'
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        <Plus color='#0468FF' />
                                    </div>
                                    <div>
                                        <p className='font-bold text-[16px] text-white'>Новая группа</p>
                                    </div>
                                </div>
                            </li>

                            <CustomOrder isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                        </ul>
                    </div>
                    <div className='flex flex-wrap justify-center xl:justify-start  mt-[30px] gap-[30px]'>
                        <div className=' '>
                            <div className='flex flex-wrap justify-center xl:justify-start gap-[10px]'>
                                <img src="/img/Big-appartament.png" alt="" className='w-[330px] h-[240px] rounded-[20px]' />
                                <div className='flex flex-wrap sm:flex-col gap-[40px] sm:gap-[15px]'>
                                    <img src="/img/mini-appartament.png" alt="" className=' rounded-[20px]' />
                                    <img src="/img/mini-appartament.png" alt="" className=' rounded-[20px]' />
                                    <img src="/img/mini-appartament.png" alt="" className=' rounded-[20px]' />
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-center xl:justify-start gap-[8.5px] mt-[25px] '>
                                <MiniGreyButton><CornerUpRight size={17} /></MiniGreyButton>
                                <MiniGreyButton><Pencil size={17} /></MiniGreyButton>
                                <MiniGreyButton><Download size={17} /></MiniGreyButton>
                                <MiniGreyButton><TriangleAlert size={17} /></MiniGreyButton>
                                <MiniGreyButton><FolderClosed size={17} /></MiniGreyButton>
                                <MiniGreyButton><FolderOpen size={17} /></MiniGreyButton>
                                <MiniGreyButton><EyeOff size={17} /></MiniGreyButton>
                                <button className='w-[88px] h-[28px] rounded-[10px] bg-[#E12B2B] text-white text-[12px]'>Удалить</button>
                            </div>

                        </div>
                        <div>
                            <div className=" px-[20px]  text-center xl:text-left">
                                <div>
                                    <h1 className="text-[22px] font-bold pb-[5px]">999 999 999 {currencySymbol}</h1>
                                    <p>1-комн. кв. · 49,60м² · 17/27 этаж</p>
                                </div>

                                <div className="flex flex-wrap justify-center xl:justify-start gap-[10px] items-center pt-[15px] pb-[15px]">
                                    <div className="flex gap-[6px] items-center justify-center">
                                        <MapPin color="#9D9D9D" size={17} />
                                        <p className="text-[16px]">Островская</p>
                                    </div>
                                    <div className="flex gap-[6px] items-center justify-center">
                                        <Timer color="#9D9D9D" size={17} />
                                        <p className="text-[16px]">
                                            <span className="text-[16px] font-bold">14</span> минут
                                        </p>
                                    </div>
                                </div>

                                <p className="text-[#BCBCBC] ">2-й Амбулаторный проезд, 18</p>
                                <p className='max-w-[600px] w-full mt-[15px] text-[14px]'>Xотите перeеxать в уютную кваpтиpу? Переeзжaйтe жить в caмый экологичный и прогрeсcивный pайон Xотите перeеxать в уютную кваpтиpу?
                                    Xотите перeеxать в уютную кваpтиpу? Переeзжaйтe жить в caмый экологичный и прогрeсcивный pайон Xотите перeеxать в уютную кваpтиpу? </p>
                                <div className='flex flex-wrap gap-[10px] mt-[25px] justify-end'>
                                    <button className='bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium'>+7 (999) 999 99 99</button>
                                    <button className='bg-[#0468FF] w-[155px] h-[30px] rounded-[10px] text-white text-[14px] font-medium'>Сохранить фильтры</button>
                                </div>

                            </div>

                        </div>
                        <div className="flex items-start gap-[25px]">
                            <input
                                type="checkbox"
                                id="price-checkbox"
                                className="hidden"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label
                                htmlFor="price-checkbox"
                                className="w-[20px] h-[20px] flex items-center justify-center rounded-[5px] bg-[#ffffff] cursor-pointer transition-all duration-300  "
                            >
                                {isChecked && (
                                    <div className="w-[12px] h-[12px] bg-[#0468FF] rounded-[3px] transition-all duration-300"></div>
                                )}
                            </label>



                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
