import React, {useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
export default function Chance({state,dispatch}){
    const [provinces,setProvinces] = useState([]);
    const [provincesPost,setProvincesPost] = useState(false);
    const [periods,setPeriods] = useState([]);
    const [periodsPost,setPeriodsPost] = useState(false);
    const [tendencies,setTendencies] = useState([]);
    const [tendenciesPost,setTendenciesPost] = useState(false);
    const [subTendencies,setSubTendencies] = useState([]);

    const [selectedTendency,setSelectedTendency] = useState(null);

    const [choiceData, choiceStatus] = useApi(
        preProcessUser('login', {code:state.data.code}),
        postProcessUser, [],
        true);

    const [provincesData, provincesStatus] = useApi(
        preProcessUser('provinces', {}),
        postProcessUser, [provincesPost],
        provincesPost);

    const [tendenciesData, tendenciesStatus] = useApi(
        preProcessUser('tendenciesChoice', {field:state.data.fieldOfChoice.id}),
        postProcessUser, [tendenciesPost],
        tendenciesPost);

    const [subTendenciesData, subTendenciesStatus] = useApi(
        preProcessUser('subTendenciesChoice', {tendency:selectedTendency}),
        postProcessUser, [selectedTendency],
        selectedTendency !== null);

    const [periodsData, periodsStatus] = useApi(
        preProcessUser('periods', {}),
        postProcessUser, [periodsPost],
        periodsPost);

    useEffect(()=>{
        if (provincesStatus==='SUCCESS'){
            setProvinces(provincesData.list)
        }
        setProvincesPost(false)
    },[provincesPost])

    useEffect(()=>{
        if (periodsStatus==='SUCCESS'){
            setPeriods(periodsData.list)
        }
        setPeriodsPost(false)
    },[periodsStatus])

    useEffect(()=>{
        if (tendenciesStatus==='SUCCESS'){
            setTendencies(tendenciesData.list)
        }
        setTendenciesPost(false)
    },[tendenciesStatus])

    useEffect(()=>{
        if (subTendenciesStatus==='SUCCESS'){
            setSubTendencies(subTendenciesData.list)
        }
    },[subTendenciesStatus])

    function periodsLabel(name){
        switch (name){
            case 'Roozaneh':
                return 'روزانه';
            case 'Shabaneh':
                return 'شبانه';
            case 'PayamNoor':
                return 'پیام نور';
            case 'Pardis':
                return 'پردیس';
            case 'MajaziDolati':
                return 'مجازی دولتی';
            case 'GheireEntefaei':
                return 'غیر انتفاعی';
        }
    }

    return <div className={'w-100 container'}>
        <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (تعیین شانس‌ها و احتمال قبولی)</h4>
            <div className={'w-100'}>
                <form action="" className={'d-flex w-100 justify-content-around my-4'}>
                    <div >
                        <label htmlFor="">
                            استان
                        </label>

                        <select onClick={()=> {
                            if (provinces.length === 0){
                                setProvincesPost(true)
                            }
                        }} name="" id="" className={'form-control'} >
                                <option value="">انتخاب استان</option>
                                {
                                    provinces.map((item,index)=>{
                                        return <option value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                    </div>
                    <div>
                        <label htmlFor="">
                            گرایش
                        </label>

                        <select onClick={()=> {
                            if (tendencies.length === 0){
                                setTendenciesPost(true)
                            }
                        }} onChange={(e)=>{
                            setSelectedTendency(e.target.value)
                        }} name="" id="" className={'form-control'} >
                            <option value="">انتخاب گرایش</option>
                            {
                                tendencies.map((item,index)=>{
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">
                            زیر گرایش
                        </label>
                        <select name="" id="" className={'form-control'} >
                            <option value="">انتخاب زیر گرایش</option>
                            {
                                subTendencies.map((item,index)=>{
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">
                            دوره
                        </label>
                        <select onClick={()=>{
                            if (periods.length === 0){
                                setPeriodsPost(true)
                            }
                        }} name="" id="" className={'form-control'} >
                            <option value="">انتخاب گرایش</option>
                            {
                                periods.map((item,index)=>{
                                    return <option value={item.id}>{periodsLabel(item.name)}</option>
                                })
                            }
                        </select>
                    </div>
                </form>
                <table className={'table'}>
                    <thead>
                        <tr>
                            <th>انتخاب</th>
                            <th>شانس قبولی</th>
                            <th>رشته/گرایش</th>
                            <th>دانشگاه/دوره</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
}
