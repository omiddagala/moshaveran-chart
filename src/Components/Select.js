import React from 'react'

export default function Select({placeHolder, options, value, onChange, className}) {
    return <select className={`form-control col ${className}`}
                   value={value}
                   onChange={(e) => {
                       onChange(e.target.value)
                   }}>
        <option key={'null'} value={''}>{placeHolder}</option>
        {options.map((item, index) => {
            return <option key={index} value={item.id}>{item.name}</option>
        })}
    </select>
}