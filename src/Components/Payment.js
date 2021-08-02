import React, {useEffect, useState} from "react";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import { useLocation } from 'react-router-dom'
import cogoToast from "cogo-toast";
import InputNumber from "./InputNumber";

export default function Payment({userId,setLoading,group,type='radio',pageType='TAKHMIN_BEHDASHT'}){
    const [packageSelected ,setPackageSelected] = useState([])
    const [postPay ,setPostPay] = useState(false)
    const [sumPrice,setSumPrice] = useState(0)
    const [offCode,setOffCode] = useState('')
    const [offPost,setOffPost] = useState(false)
    const [offValue,setOffValue] = useState(0)
    const location = useLocation();

    const [packages,setPackages]=useState([])

    function paymentType(){
        if(['ENTEKHAB_BEHDASHT','ENTEKHAB_OLOOM'].includes(pageType)){
            if (group===1){
                return 'ENTEKHAB_BEHDASHT'
            }else{
                return 'TAKHMIN_OLOOM'
            }
        }else{
            if (group===1){
                return 'TAKHMIN_BEHDASHT'
            }else{
                return 'TAKHMIN_OLOOM'
            }
        }
    }

    const [payData, payStatus] = useApi(
        preProcessUser('pay', {
            userId,
            packages: packageSelected,
            callback:['ENTEKHAB_BEHDASHT','ENTEKHAB_OLOOM'].includes(pageType) ?location.pathname.replace('/','').replace('pay','level') : location.pathname.replace('/',''),
            paymentType: paymentType(),
            offCode
        }),
        postProcessUser, [postPay],
        postPay && packageSelected!==null);

    const [packagesData, packagesStatus] = useApi(
        preProcessUser('packages', {type: pageType}),
        postProcessUser, [],
        true);

    const [offData, offStatus] = useApi(
        preProcessUser('off', {code: offCode}),
        postProcessUser, [offPost],
        offPost);

    useEffect(()=>{
        setLoading([payStatus,offStatus].includes('LOADING'))
    },[payStatus,offStatus])

    useEffect(()=>{
        if (packagesStatus==='SUCCESS'){
            setPackages(packagesData.list)
        }
    },[packagesStatus])

    useEffect(()=>{
        if (offStatus==='SUCCESS'){
            if (offData.amount){
                setOffValue(offData.amount)
                cogoToast.success('کد تخفیف با موفقیت اعمال گردید.')
            }else {
                cogoToast.error('کد تخفیف وارد شده اشتباه است')
            }
        }
        setOffPost(false)
    },[offStatus])

    return <div>
        {
         ['TAKHMIN_BEHDASHT','TAKHMIN_OLOOM'].includes(pageType) && <p className={'alert alert-info'}>لطفا برای درخواست بیشتر، یکی از پکیج‌های زیر را خریداری نمایید.</p>
        }
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

                let s = 0
                packages.forEach(item=>{
                    if (temp.includes(item.id)){
                        s += item.price
                    }
                })
                setSumPrice(s)
                setPackageSelected(temp)
            }
            }>
                {['TAKHMIN_BEHDASHT','TAKHMIN_OLOOM'].includes(pageType) && packages.map((item,index)=>{
                    return  <label key={index} htmlFor={`package-${item.id}`}>
                        <input type={type} name={'package'} value={item.id} id={item.id} className={'mx-2'}/>
                        تعداد {item.number} درخواست به مبلغ {item.price} تومان
                    </label>
                })}
                {['ENTEKHAB_BEHDASHT','ENTEKHAB_OLOOM'].includes(pageType) && packages.map((item,index)=>{
                    return  <label key={index} htmlFor={`package-${item.id}`}>
                    <input type={type} name={'package'} value={item.id} id={item.id} className={'mx-2'}/>
                        {item.name} : {item.price} تومان
                    </label>
                })}
                {['ENTEKHAB_BEHDASHT','ENTEKHAB_OLOOM'].includes(pageType) && <div className={'d-flex justify-content-center'}>
                    <p>قیمت : {sumPrice - offValue} تومان </p>
                </div>}
                <button className={'btn btn-success mt-3'} disabled={packageSelected===null}>پرداخت</button>
                {['ENTEKHAB_BEHDASHT','ENTEKHAB_OLOOM'].includes(pageType) && <div className={'d-flex col-lg-6 mt-4'}>
                    <InputNumber className={'form-control'} value={offCode} onchange={(v)=>setOffCode(v)} placeHolder={'کد تخفیف'} type="text"/>
                    <button type={'button'} className={'btn btn-primary'} onClick={()=>setOffPost(true)}>اعمال</button>
                </div>}
            </div>
        </form>
    </div>
}
