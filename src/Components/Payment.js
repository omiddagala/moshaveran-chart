import React, {useEffect, useState} from "react";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import { useLocation } from 'react-router-dom'

export default function Payment({userId,setLoading,group}){
    const [packageSelected ,setPackageSelected] = useState([])
    const [postPay ,setPostPay] = useState(false)
    const location = useLocation();

    const [packages]=useState([{number:1,amount:1500},{number:3,amount:4000},{number:5,amount:5000}])
    const [payData, payStatus] = useApi(
        preProcessUser('pay', {userId,packages: packageSelected,callback:location.pathname.replace('/',''),paymentType:group ===1 ?'TAKHMIN_BEHDASHT':'TAKHMIN_OLOOM'}),
        postProcessUser, [postPay],
        postPay && packageSelected!==null);

    // const [packagesData, packagesStatus] = useApi(
    //     preProcessUser('packages', 'TAKHMIN_BEHDASHT'),
    //     postProcessUser, [],
    //     true);

    useEffect(()=>{
        setLoading(payStatus === 'LOADING')
    },[payStatus])

    return <div>
        <p className={'alert alert-info'}>لطفا برای درخواست بیشتر، یکی از پکیج‌های زیر را خریداری نمایید.</p>
        <form onSubmit={(e)=>{
            e.preventDefault()
            setPostPay(true)
        }}>
            <div className={'card p-5'} onChange={(e)=>{
                let temp =packageSelected;
                let value = parseInt(e.target.value)
                if (e.target.type ==='radio'){
                    temp =[value]
                }else{
                    if (temp.includes(value)){
                        temp = temp.filter(item=>item!==value);
                    }else{
                        temp.push(value)
                    }
                }
                console.log(temp);
                setPackageSelected(temp)
            }
            }>
                {packages.map((item,index)=>{
                    return  <label key={index} htmlFor={`package-${index}`}>
                        <input type="radio" name={'package'} value={index} id={index} className={'mx-2'}/>
                        تعداد {item.number} درخواست به مبلغ {item.amount} تومان
                    </label>
                })}
                <button className={'btn btn-success mt-3'} disabled={packageSelected===null}>پرداخت</button>
            </div>
        </form>
    </div>
}
