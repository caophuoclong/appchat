import * as React from 'react';
import {UseFormRegister} from "react-hook-form"

export interface IInputProps {
    id: string;
    name: string;
    register: UseFormRegister<any>;
    errors: any;
    children?: JSX.Element;
}

export default function Input ({id, name, register, errors, children}: IInputProps) {
  return (
    <div className="w-full px-4 my-2">
        <label htmlFor={id} className="text-sm px-4">{name}</label>
        <br />
        <div className="border-2 border-glareGray500 shadow-lg rounded-full p-2 flex items-center">
        <input  className="w-11/12 outline-none bg-transparent px-2" {...register(id)} type={
            id.match(/password/i) ? "password" : "text"
        } id={id} />
        <span className="text-xs text-red-500">*</span>
        {children}
        </div>
        {errors[id] && <span className="pl-8 text-xs text-red-500">{errors[id].message}</span>}
    </div>
  );
}
