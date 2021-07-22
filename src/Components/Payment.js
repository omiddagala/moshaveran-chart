import React, {useEffect, useState} from "react";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import { useLocation } from 'react-router-dom'
import cogoToast from "cogo-toast";

export default function Payment({userId,setLoading,group,type='radio',pageType='TAKHMIN_BEHDASHT'}){
    const [packageSelected ,setPackageSelected] = useState([])
    const [postPay ,setPostPay] = useState(false)
    const location = useLocation();

    const [packages,setPackages]=useState([])
    const [payData, payStatus] = useApi(
        preProcessUser('pay', {userId,packages: packageSelected,callback:location.pathname.replace('/',''),paymentType:group ===1 ?'TAKHMIN_BEHDASHT':'TAKHMIN_OLOOM'}),
        postProcessUser, [postPay],
        postPay && packageSelected!==null);

    const [packagesData, packagesStatus] = useApi(
        preProcessUser('packages', {type: pageType}),
        postProcessUser, [],
        true);

    useEffect(()=>{
        setLoading(payStatus === 'LOADING')
    },[payStatus])

    useEffect(()=>{
        if (packagesStatus==='SUCCESS'){
            setPackages(packagesData.list)
        }
    },[packagesStatus])

    return <div>
        <p className={'alert alert-info'}>لطفا برای درخواست بیشتر، یکی از پکیج‌های زیر را خریداری نمایید.</p>
        <form onSubmit={(e)=>{
            e.preventDefault()
            if (packageSelected.length >0){
                setPostPay(true)
            }else{
                cogoToast.error('لطفا پکیج مورد نظر را انتخاب نمایید.')
            }
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
                    return  <label key={index} htmlFor={`package-${item.id}`}>
                        <input type={type} name={'package'} value={item.id} id={item.id} className={'mx-2'}/>
                        تعداد {item.number} درخواست به مبلغ {item.price} تومان
                    </label>
                })}
                <button className={'btn btn-success mt-3'} disabled={packageSelected===null}>پرداخت</button>
            </div>
        </form>
    </div>
}
