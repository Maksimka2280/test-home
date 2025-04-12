import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { Lock, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
interface RegModalProps {
  closeModal: () => void;
}

type FormData = {
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

type FormErrors = {
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
};

export default function RegModal({ closeModal }: RegModalProps) {
  const regApi = async function (params: {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
  }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        email: params.email,
        username: params.username,
        password: params.password,
        confirm_password: params.confirm_password,
      });

      console.log('Успешная регистрация:', response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  };
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.phone) {
      newErrors.phone = 'Телефон обязателен';
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Почта обязательна';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат почты';
      isValid = false;
    }

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = await regApi({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          confirm_password: formData.confirmPassword,
        });

        console.log('Форма успешно отправлена', data);
        closeModal(); // Закрыть модалку после успешной отправки
      } catch (err) {
        console.error('Ошибка при отправке данных на API:', err);
      }
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
        onClick={closeModal}
      ></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 w-[95%] max-w-[580px] max-h-[90vh] rounded-[30px] overflow-y-auto p-4 md:p-6 shadow-lg">
        <button
          className="absolute top-4 right-4 text-3xl text-[#BCBCBC] hover:text-black"
          onClick={closeModal}
        >
          ×
        </button>

        <div className="flex flex-col justify-center items-center">
          <img src="/img/logo.jpg" alt="logo" className="w-[80px] h-[80px] rounded-full mb-4" />
          <h1 className="font-bold text-[22px] md:text-[30px] text-center">Зарегистрироваться</h1>

          <form onSubmit={handleSubmit} className="mt-6 w-full flex flex-col gap-5">
            {/* Телефон */}
            <div className="relative w-full">
              <Phone
                className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                size={14}
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Телефон"
                type="text"
                className={`pl-10 w-full ${errors.phone ? 'border border-red-500' : ''}`}
              />
              {errors.phone && (
                <div className="absolute right-3 top-[35px] transform -translate-y-1/2">
                  <X size={18} color="red" />
                </div>
              )}
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Почта */}
            <div className="relative w-full">
              <Mail
                className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                size={14}
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Почта"
                type="email"
                className={`pl-10 w-full ${errors.email ? 'border border-red-500' : ''}`}
              />
              {errors.email && (
                <div className="absolute right-3 top-[35px] transform -translate-y-1/2">
                  <X size={18} color="red" />
                </div>
              )}
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Имя пользователя */}
            <div className="relative w-full">
              <User
                className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                size={14}
              />
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Имя пользователя"
                type="text"
                className={`pl-10 w-full ${errors.username ? 'border border-red-500' : ''}`}
              />
              {errors.username && (
                <div className="absolute right-3 top-[35px] transform -translate-y-1/2">
                  <X size={18} color="red" />
                </div>
              )}
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>

            {/* Пароль */}
            <div className="relative w-full">
              <Lock
                className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                size={14}
              />
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                type="password"
                className={`pl-10 w-full ${errors.password ? 'border border-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Повтор пароля */}
            <div className="relative w-full">
              <Lock
                className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                size={14}
              />
              <Input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                type="password"
                className={`pl-10 w-full ${errors.confirmPassword ? 'border border-red-500' : ''}`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <p className="text-center text-sm">
              Нажимая, вы соглашаетесь с обработкой{' '}
              <Link href="#" className="text-[#0468FF] underline">
                персональных данных
              </Link>
            </p>

            <Button width="100%" height="60px" rounded="15px" color="blue" type="submit">
              Зарегистрироваться
            </Button>

            <Link href="#">
              <p className="text-[#0468FF] text-center mt-2">Нужна помощь</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
