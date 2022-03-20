import React from 'react'

interface Props {
    options: Array<{
        label: string,
        value: string
    }>,
    onChange: (value: string) => void,
    value: string;
}

export default function SelectLanguage({options,onChange, value}: Props) {
    const handleOnChange = (event: React.ChangeEvent)=>{
        const value = (event.target as HTMLSelectElement).value;
        onChange(value);
    }
  return (
    <select value={value} onChange={handleOnChange} className="flex gap-2 top-2 transition-all py-1 my-2">
        {
            options.map((value,index)=>{
                console.log(value);
                return <option value={value.value} key={index}>
                {value.label}
            </option>
            })
        }
    </select>
  )
}