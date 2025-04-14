'use client';

import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { Lock, Mail, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import RegModal from '../LoginandReg/Reg';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

interface LoginResponse {
  access_token: string;
}

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  const toggleModal = () => setIsOpen(prev => !prev);
  const toggleRegisterModal = () => {
    setIsOpen(false);
    setIsRegisterOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    if (loginErrors[e.target.name as keyof typeof loginErrors]) {
      setLoginErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validateLogin = () => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!loginData.email) {
      errors.email = 'Email обязателен';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(loginData.email)) {
      errors.email = 'Неверный формат email';
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = 'Пароль обязателен';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const LoginApi = async (params: { email: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login/`, {
        email: params.email,
        password: params.password,
      });

      return response.data;
    } catch (error) {
      console.error('Ошибка при входе в аккаунт:', error);
      throw error;
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        const response = await LoginApi({
          email: loginData.email,
          password: loginData.password,
        });

        console.log('Авторизация успешна:', response.access_token);
        setIsOpen(false);
        localStorage.setItem('access_token', response.access_token);
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
    }
  };

  return (
    <>
      <Button color="blue" height="37px" rounded="10px" width="100px" onClick={toggleModal}>
        Войти
      </Button>

      {isOpen && !isRegisterOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
            onClick={toggleModal}
          ></div>

          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 w-[90%] max-w-[580px] max-h-[90vh] rounded-[30px] transition-all duration-500 ease-in-out overflow-auto p-4 md:p-6">
            <button
              className="absolute top-4 right-4 text-5xl text-[#BCBCBC] hover:text-black"
              onClick={toggleModal}
            >
              ×
            </button>

            <div className="flex flex-col justify-center items-center mt-8 md:mt-4">
              <img src="/img/logo.jpg" alt="Логотип" className="w-[80px] h-[80px] rounded-full" />
              <div className="w-full max-w-[500px]">
                <h1 className="font-bold text-[23px] md:text-[30px] text-center mt-4">
                  Войти в личный кабинет
                </h1>

                <form className="mt-10" onSubmit={handleLoginSubmit}>
                  <div className="flex flex-col gap-[20px]">
                    {/* Email */}
                    <div className="relative w-full">
                      <Mail
                        className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                        size={16}
                        color="#9D9D9D"
                      />
                      <Input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        className={`pl-10 w-full ${loginErrors.email ? 'border border-red-500' : ''}`}
                      />
                      {loginErrors.email && (
                        <div className="absolute right-3 top-[35px] transform -translate-y-1/2">
                          <X size={18} color="red" />
                        </div>
                      )}
                      {loginErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>
                      )}
                    </div>

                    {/* Пароль */}
                    <div className="relative w-full">
                      <Lock
                        className="absolute left-3 top-[35px] transform -translate-y-1/2 text-gray-500"
                        size={16}
                        color="#9D9D9D"
                      />
                      <Input
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className={`pl-10 w-full ${loginErrors.password ? 'border border-red-500' : ''}`}
                      />
                      {loginErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{loginErrors.password}</p>
                      )}
                    </div>
                  </div>

                  <Link href="#">
                    <p className="text-[#0468FF] text-center mt-[20px] text-sm">
                      Забыл пароль или email
                    </p>
                  </Link>

                  <div className="flex flex-col gap-[15px] mt-[25px]">
                    <Button width="100%" height="60px" rounded="15px" color="blue" type="submit">
                      Войти
                    </Button>
                    <Button
                      width="100%"
                      height="60px"
                      rounded="15px"
                      color="blue"
                      onClick={toggleRegisterModal}
                    >
                      Зарегистрироваться
                    </Button>
                  </div>
                </form>

                <Link href="#">
                  <p className="text-[#0468FF] text-center mt-[20px] text-sm">Нужна помощь</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {isRegisterOpen && <RegModal closeModal={closeRegisterModal} />}
    </>
  );
}
