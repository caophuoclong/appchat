import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import { BiUser, BiKey } from 'react-icons/bi';
import { MdOutlineMail } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import userApi from '../../../services/user.api';
import sw2 from 'sweetalert2';
interface Props {
  language: string;
  setIsSignUp: (value: boolean) => void;
  handleSetUserNameAndPassword: (value: { username: string; password: string }) => void;
}
interface formValue {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export default function SignUp({ language, setIsSignUp, handleSetUserNameAndPassword }: Props) {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required(language === 'en' ? 'Username is required' : 'Tên đăng nhập không được để trống')
      .min(5, language === 'en' ? 'Username must be at least 5 characters' : 'Tối thiểu 5 ký tự')
      .max(20, language === 'en' ? 'Username no more than 20 characters' : 'Tối đa 20 ký tự')
      .matches(
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        language === 'en' ? 'Invalid username' : 'Tên đăng nhập không hợp lệ'
      ),
    password: yup
      .string()
      .required(language === 'en' ? 'Password is required' : 'Mật khẩu không được để trống')
      .min(5, language === 'en' ? 'Password must be at least 5 characters' : 'Tối thiểu 5 ký tự')
      .max(20, language === 'en' ? 'Password no more than 20 characters' : 'Tối đa 20 ký tự')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        language === 'en'
          ? 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
          : 'Mật khẩu phải bao gồm chữ thường, chữ hoa, số và ký tự đặc biệt'
      ),
    email: yup
      .string()
      .email(language === 'en' ? 'Email is invalid' : 'Không đúng định dạng')
      .required(language === 'en' ? 'Email is required' : 'Email không được để trống'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        language === 'en' ? 'Password does not match' : 'Mật khẩu không khớp'
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValue>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: formValue) => {
    try {
      const response = await userApi.register(data.username, data.confirmPassword, data.email);
      console.log(response);
      if (response.status === 200) {
        sw2.fire({
          icon: 'success',
          title: language === 'en' ? 'Register successfully!' : 'Đăng ký thành công!',
          showConfirmButton: true,
          timer: 1500,
        });
        setIsSignUp(false);
        handleSetUserNameAndPassword({
          username: data.username,
          password: data.password,
        });
      }
      if (response.code === 400) {
        sw2.fire({
          icon: 'error',
          title: language === 'en' ? 'Username already exists!' : 'Tên đăng nhập đã tồn tại!',
          showConfirmButton: true,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Input
        id="username"
        name={language === 'en' ? 'Username' : 'Tên đăng nhập'}
        register={register}
        errors={errors}
      >
        <BiUser size="24px" />
      </Input>
      <Input id="email" name="Email" register={register} errors={errors}>
        <MdOutlineMail size="24px" />
      </Input>
      <Input
        id="password"
        name={language === 'en' ? 'Password' : 'Mật khẩu'}
        register={register}
        errors={errors}
      >
        <BiKey size="24px" />
      </Input>
      <Input
        id="confirmPassword"
        name={language === 'en' ? 'Confirm Password' : 'Nhập lại mật khẩu'}
        register={register}
        errors={errors}
      >
        <BiKey size="24px" />
      </Input>
      <div className="flex justify-end">
        <button className="rounded-full py-2 px-8 bg-glareBrown my-2 mr-8 text-white" type="submit">
          {language === 'en' ? 'Sign Up' : 'Đăng ký'}
        </button>
      </div>
    </form>
  );
}
