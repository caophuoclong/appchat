import React from 'react'

interface Props {
    options: Array<{
        label: string,
        value: string
    }>,
    onChange: (value: any) => void,
    value: string;
    children?: JSX.Element
}

export default function SelectLanguage({options,onChange, value, children}: Props) {
    const handleOnChange = (event: React.ChangeEvent)=>{
        const value = (event.target as HTMLSelectElement).value;
        onChange(value);
    }
  return (
    <select value={value} onChange={handleOnChange} className="flex gap-2 top-2 transition-all py-1 my-2 outline-none">
        {children}
        {
            options.map((value,index)=>{
                return <option value={value.value} key={index}>
                {value.label}
            </option>
            })
        }
    </select>
  )
}