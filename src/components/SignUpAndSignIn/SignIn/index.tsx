import React from 'react'
import {useForm} from "react-hook-form";
import { BiKey, BiUser } from 'react-icons/bi';
import Input from "../Input"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import userApi from '../../../services/user.api';
import sw2 from "sweetalert2";
interface Props {
    language: string,
    userNameAndPassowrd: {
        username: string,
        password: string
    },handleSetShowSigning: (value: boolean)=> void
}
interface formValue{
    username: string;
    password: string;
}
export default function SignIn({language, userNameAndPassowrd, handleSetShowSigning}: Props) {

    const schema = yup.object().shape({
        username: yup.string().required(language === "en" ? "Username is required": "Tên đăng nhập không được trống"),
        password: yup.string().required(language === "en"?"Password is required": "Mật khẩu không được trống")
    })
    const {register, handleSubmit, setValue,formState: {errors}}  = useForm<formValue>({
        resolver: yupResolver(schema),

    });
    setValue("username", userNameAndPassowrd.username);
    setValue("password", userNameAndPassowrd.password);
    const onSubmit = async (data: formValue)=>{
        handleSetShowSigning(true);
        const user:{
            code: number, status: string, message: string, data:{
                accessToken: string,
                refreshToken: string
            }
        } = await userApi.login(data.username, data.password);
        if(user.code === 200){
            window.localStorage.setItem("access_token", JSON.stringify(user.data.accessToken));
            window.localStorage.setItem("refresh_token", JSON.stringify(user.data.refreshToken));
            window.location.href = "/";
            setTimeout(()=>{
                handleSetShowSigning(false);
            },1000)
        }
        if(user.code === 404){
            sw2.fire({
                icon: 'error',
                title: 'Oops...',
                text: language === "en" ? "Your account is not exist!": "Tài khoản không tồn tại!",
                footer: language === "en" ? 'Please register!.': "Vui lòng đăng ký tài khoản"   ,
                timer: 2000          
            })
        }
        if(user.code === 401){
            sw2.fire({
                icon: 'error',
                title: 'Oops...',
                text: language === "en" ? "Your password is incorrect!": "Mật khẩu không đúng!",
                footer: language === "en" ? 'Please retype your password!.': "Vui lòng nhập lại mật khẩu!"   ,
                timer: 2000          
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="">
            <Input id="username" name={language === "en" ? "Username" : "Tên đăng nhập"}  register={register} errors={errors}>
               <BiUser size="24px"/>
            </Input>
            <Input id="password" name={language === "en" ? "Password" : "Mật khẩu"}  register={register} errors={errors}>
               <BiKey size="24px"/>
            </Input>
            <div className="flex justify-center items-center my-2">
                <button className="rounded-full py-2 px-8 bg-glareBrown text-white" type="submit">{
                    language === "en" ? "Sign In" : "Đăng nhập"
                }</button>
            </div>
        </form>
  )
}