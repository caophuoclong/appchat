import React from 'react'
import {useForm} from "react-hook-form";
import { BiKey, BiUser } from 'react-icons/bi';
import Input from "../Input"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import userApi from '../../../services/user.api';
interface Props {
    language: string
}
interface formValue{
    username: string;
    password: string;
}
export default function SignIn({language}: Props) {
    const schema = yup.object().shape({
        username: yup.string().required(language === "en" ? "Username is required": "Tên đăng nhập không được trống"),
        password: yup.string().required(language === "en"?"Password is required": "Mật khẩu không được trống")
    })
    const {register, handleSubmit, formState: {errors}}  = useForm<formValue>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: formValue)=>{
        const user = await userApi.login(data.username, data.password);
        console.log(user.data.accessToken);
        if(user){
            window.localStorage.setItem("access_token", JSON.stringify(user.data.accessToken));
            window.localStorage.setItem("refresh_token", JSON.stringify(user.data.refreshToken));
            window.location.href = "/";
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