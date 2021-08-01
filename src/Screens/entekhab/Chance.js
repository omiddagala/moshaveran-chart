import React, {useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import cogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import Store from "../../Storage/Store";
import {periodsLabel,chanceLabel} from  '../../HelperFunction'

export default function Chance({state,dispatch}){
    const [chances,setChances] = useState([]);
    const [provinces,setProvinces] = useState([]);
    const [provincesPost,setProvincesPost] = useState(false);
    const [chancePost,setChancePost] = useState(false);
    const [periods,setPeriods] = useState([]);
    const [periodsPost,setPeriodsPost] = useState(false);
    const [tendencies,setTendencies] = useState([]);
    const [tendenciesPost,setTendenciesPost] = useState(false);
    const [subTendencies,setSubTendencies] = useState([]);
    const [page,setPage] = useState(1)
    const [selectedTendency,setSelectedTendency] = useState(null);
    const [selectedSubTendency,setSelectedSubTendency] = useState(null);
    const [selectedPeriod,setSelectedPeriod] = useState(null);
    const [selectedProvince,setSelectedProvince] = useState(null);
    const [savePost,setSavePost] = useState(false);
    const history = useHistory()

    useEffect(()=>{
        if(state.data.code!==null){
            setChancePost(true)
        }
    },[state.data.code])

    const [chanceData, chanceStatus] = useApi(
        preProcessUser('chance', {
            "code": state.data.code,
            "tendencyOfChoice": selectedTendency,
            "subtendency": selectedSubTendency,
            "universityType": selectedPeriod,
            "province": selectedProvince,
            "pageableDTO": {
                "page": page,
                "size": 20,
                "sortBy": "id",
                "direction": "ASC"
            }
        }),
        postProcessUser, [chancePost],
        chancePost);

    const [provincesData, provincesStatus] = useApi(
        preProcessUser('provinces', {}),
        postProcessUser, [provincesPost],
        provincesPost);

    const [tendenciesData, tendenciesStatus] = useApi(
        preProcessUser('tendenciesChoice', {field:state.data.fieldOfChoice.id}),
        postProcessUser, [tendenciesPost],
        tendenciesPost);

    const [subTendenciesData, subTendenciesStatus] = useApi(
        preProcessUser('subTendenciesChoice', {tendency:selectedTendency?.id??null}),
        postProcessUser, [selectedTendency],
        selectedTendency !== null);

    const [periodsData, periodsStatus] = useApi(
        preProcessUser('periods', {}),
        postProcessUser, [periodsPost],
        periodsPost);

    const [saveData, saveStatus] = useApi(
        preProcessUser('save', chances.filter(item=>item.selected).map(item=>{
            return {
                label : item.label,
                choice : {
                    id : state.data.id
                },
                notebook:{
                    id : item.nId
                }
            }
        })),
        postProcessUser, [savePost],
        savePost);

    useEffect(()=>{
        if (saveStatus==='SUCCESS'){
            cogoToast.success('ذخیره با موفقیت انجام شد.')
        }
        setSavePost(false)
    },[saveStatus])



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

    useEffect(()=>{
        if (chanceStatus==='SUCCESS'){
            setChances(chanceData.list)
        }
        setChancePost(false)
    },[chanceStatus])



    return <div className={'w-100 container'}>
        <div className={'input-box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (تعیین شانس‌ها و احتمال قبولی)</h4>
            <div className={'w-100'}>
                <form action="" className={'d-flex flex-column flex-lg-row  w-100 justify-content-around my-4'}>
                    <div>
                        <label htmlFor="">
                            استان
                        </label>

                        <select onClick={()=> {
                            if (provinces.length === 0){
                                setProvincesPost(true)
                            }
                        }} name="" id="" className={'form-control'} onChange={(e)=>{
                            setSelectedProvince( e.target.value  !== '' ?{id:e.target.value}:null)
                        }}>
                                <option value="">همه استان‌ها</option>
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
                            setSelectedTendency({id:e.target.value})
                        }} name="" id="" className={'form-control'} >
                            <option value="">همه گرایش‌ها</option>
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
                        <select name="" id="" className={'form-control'} onChange={(e)=>{
                            setSelectedSubTendency({id:e.target.value})
                        }}>
                            <option value="">همه زیر گرایش‌ها</option>
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
                        }} name="" id="" className={'form-control'} onChange={(e)=>{
                            setSelectedPeriod({id:e.target.value})
                        }}>
                            <option value="">همه‌ دوره‌ها</option>
                            {
                                periods.map((item,index)=>{
                                    return <option value={item.id}>{periodsLabel(item.name)}</option>
                                })
                            }
                        </select>
                    </div>
                </form>
                <div className={'d-flex justify-content-center mb-3'}>
                    <button onClick={()=>{
                        setChancePost(true)
                    }} className={'btn btn-primary'}>اعمال تغییرات</button>
                </div>
                <div className={'table-responsive'} >
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
                        {
                            chances.map((item,index)=>{
                                return <tr>
                                    <td>
                                        <input type="checkbox" checked={chances[index].selected} className={'form-control'} onChange={(e)=>{
                                            let flag =true
                                            if (e.target.value){
                                                if (state.selectedChance.length === 100){
                                                    flag = false
                                                    cogoToast.error('انتخاب بیش از ۱۰۰ آیتم مجاز نیست')
                                                }
                                            }
                                            if (flag){
                                                let temp = chances
                                                temp[index].selected = e.target.checked
                                                let selectedList= temp.filter(item=>item.selected)
                                                dispatch.setSelectedChance(selectedList)
                                                Store.store('chance-selected',{data:selectedList})
                                                setChances([...temp])
                                            }
                                        }}/>
                                    </td>
                                    <td>
                                        <p className={'text-'+chanceLabel(item.label)[1]}>{chanceLabel(item.label)[0]}</p>
                                    </td>
                                    <td>
                                        <p>{item.tendencyName}-{item.subtendencyName}</p>
                                    </td>
                                    <td>
                                        <p>{item.universityName}-{periodsLabel(item.uniTypeName)}</p>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <button className={'btn btn-info'} onClick={()=>{
                    setSavePost(true)
                }}>ذخیره</button>
                <button className={'btn btn-primary mx-2'} onClick={()=>{
                    history.push('/entekhab/priority')
                }}>اولویت بندی</button>
            </div>
        </div>
    </div>
}
