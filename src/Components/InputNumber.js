import React, {useEffect, useState} from 'react'
import {fixPersianNumbers} from '../HelperFunction'

export default function InputNumber({value, className, onchange, type = 'integer',placeHolder}) {
    const [valueInput, setValueInput] = useState('')
    useEffect(()=>{
        setValueInput(value === null ? '' : value)
    },[value])
    return <input type="text"
                  className={className}
                  value={valueInput}
                  placeholder={placeHolder}
                  onChange={(e) => {
                      let temp = fixPersianNumbers(e.target.value)
                      if (type === 'float') {
                          temp = temp.match(/[-]?\d*.?\d*/)[0]
                      }else if ('integer'){
                          temp = temp.match(/\d*/)[0]
                      }
                      setValueInput(temp)
                      onchange(temp)
                  }
                  }/>
}
