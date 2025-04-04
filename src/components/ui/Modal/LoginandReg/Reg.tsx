import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { Phone, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react'; // Импортируем иконку крестика

interface RegModalProps {
    closeModal: () => void;
}

export default function RegModal({ closeModal }: RegModalProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        // Валидация телефона
        if (!formData.phone) {
            newErrors.phone = 'Телефон обязателен';
            isValid = false;
        } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Неверный формат телефона';
            isValid = false;
        }

        // Валидация почты
        if (!formData.email) {
            newErrors.email = 'Почта обязательна';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Неверный формат почты';
            isValid = false;
        }

        // Валидация пароля
        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        } else if (!/[0-9]/.test(formData.password) || !/[@#$%*]/.test(formData.password)) {
            newErrors.password = 'Пароль должен содержать цифры (1,2...9) и символы (@#$%*)';
            isValid = false;
        }

        // Валидация подтверждения пароля
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Повторите пароль';
            isValid = false;
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Пароли не совпадают, повторите попытку снова';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Форма успешно отправлена', formData);
            closeModal();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
                    onClick={closeModal}
                ></div>
            )}

            {isOpen && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bg-white z-50 w-[90%] md:w-[580px] h-[80vh] md:h-[830px] rounded-[30px] transition-all duration-500 ease-in-out overflow-auto p-4 md:p-6">

                    <button
                        className="absolute top-4 right-4 text-5xl text-[#BCBCBC] hover:text-black"
                        onClick={closeModal}
                    >
                        ×
                    </button>

                    <div className="flex flex-col justify-center items-center">
                        <img src="/img/logo.jpg" alt="" className="w-[90px] h-[90px] rounded-[40px]" />
                        <div>
                            <h1 className="font-bold text-[33px] text-center">Зарегистрироваться</h1>
                            <form onSubmit={handleSubmit} className="mt-[40px]">
                                <div className="flex flex-col gap-[20px]">
                                    {/* Телефон */}
                                    <div className="relative w-full md:w-[500px]">
                                        <Phone className="absolute left-3 top-[35px]  transform -translate-y-1/2 text-gray-500" size={14} color='#9D9D9D' />
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Телефон"
                                            type="text"
                                            className="pl-10 w-full"
                                        />
                                        {errors.phone && (
                                            <div className="absolute right-3 top-[35px]  transform -translate-y-1/2">
                                                <X size={18} color="red" />
                                            </div>
                                        )}
                                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                                    </div>

                                    {/* Почта */}
                                    <div className="relative w-full md:w-[500px]">
                                        <Mail className="absolute left-3 top-[35px]  transform -translate-y-1/2 text-gray-500" size={14} color='#9D9D9D' />
                                        <Input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Почта"
                                            type="email"
                                            className="pl-10 w-full"
                                        />
                                        {errors.email && (
                                            <div className="absolute right-3 top-[35px] transform -translate-y-1/2">
                                                <X size={18} color="red" />
                                            </div>
                                        )}
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                    </div>

                                    {/* Пароль */}
                                    <div className="relative w-full md:w-[500px]">
                                        <Lock className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500" size={14} color='#9D9D9D' />
                                        <Input
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Пароль"
                                            type="password"
                                            className="pl-10 w-full"
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                    </div>

                           
                                    <div className="relative w-full md:w-[500px]">
                                        <Lock className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500" size={14} color='#9D9D9D' />
                                        <Input
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Повторите пароль"
                                            type="password"
                                            className="pl-10 w-full"
                                        />
                                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                                <div className='mt-[20px]'>
                                    <p className='text-center'>Нажимая, вы соглашаетесь с обработкой </p>
                                    <Link href={'#'}>
                                        <p className="text-[#0468FF] text-center ">персональных данных</p>
                                    </Link>
                                </div>

                                <div className="mt-[20px]">
                                    <Button width="100%" height="70px" rounded="15px" color="blue" type="submit">Зарегистрироваться</Button>
                                </div>
                            </form>
                            <Link href={'#'}>
                                <p className="text-[#0468FF] text-center mt-[20px]">Нужна помощь</p>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
