import React, {useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import cogoToast from "cogo-toast";
import {useHistory} from "react-router-dom";
import Store from "../../Storage/Store";
import {periodsLabel, chanceLabel} from '../../HelperFunction'
import Header from "./Components/Header";
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from "./Components/Footer";
import routes from "./routes";

export default function Chance({state, dispatch, getUrl,group}) {
    const [chances, setChances] = useState({list: []});
    const [provinces, setProvinces] = useState([]);
    const [provincesPost, setProvincesPost] = useState(false);
    const [chancePost, setChancePost] = useState(false);
    const [periods, setPeriods] = useState([]);
    const [periodsPost, setPeriodsPost] = useState(false);
    const [tendencies, setTendencies] = useState([]);
    const [tendenciesPost, setTendenciesPost] = useState(false);
    const [subTendencies, setSubTendencies] = useState([]);
    const [page, setPage] = useState(1)
    const [selectedTendency, setSelectedTendency] = useState(null);
    const [selectedSubTendency, setSelectedSubTendency] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [savePost, setSavePost] = useState(false);
    const [view, setView] = useState(0);
    const [showPriority, setShowPriority] = useState(false);
    const [showMore, setShowMore] = useState(false)
    const [filterKey, setFilterKey] = useState(0)

    const history = useHistory()

    useEffect(() => {
        if (state.data.code !== '') {
            setChancePost(true)
        }
    }, [state.data.code, page])

    useEffect(() => {
        if (state.data.packages) {
            let temp = state.data.packages.filter(item => {
                return item.number === 1;
            })
            setShowPriority(temp.length > 0)
        }

    }, [state.data.packages])


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
        postProcessUser, [chancePost, page],
        chancePost);

    const [provincesData, provincesStatus] = useApi(
        preProcessUser('provinces', {}),
        postProcessUser, [],
        true);

    const [tendenciesData, tendenciesStatus] = useApi(
        preProcessUser('tendenciesChoice', {field: state.data.fieldOfChoice.id}),
        postProcessUser, [state.data.fieldOfChoice],
        state.data && state.data.fieldOfChoice.id !== null);

    const [subTendenciesData, subTendenciesStatus] = useApi(
        preProcessUser('subTendenciesChoice', {tendency: selectedTendency?.id ?? null}),
        postProcessUser, [selectedTendency],
        selectedTendency !== null);

    const [periodsData, periodsStatus] = useApi(
        preProcessUser('periods', {}),
        postProcessUser, [],
        true);

    const [saveData, saveStatus] = useApi(
        preProcessUser('save', chances.list.filter(item => item.selected).map(item => {
            return {
                label: item.label,
                choice: {
                    id: state.data.id
                },
                notebook: {
                    id: item.nId
                }
            }
        })),
        postProcessUser, [savePost],
        savePost);

    useEffect(() => {
        if (saveStatus === 'SUCCESS') {
            cogoToast.success('ذخیره با موفقیت انجام شد.', {
                hideAfter: 10
            })
        }
        setSavePost(false)
    }, [saveStatus])


    useEffect(() => {
        if (provincesStatus === 'SUCCESS') {
            setProvinces([...provincesData.list])
        }
        setProvincesPost(false)
    }, [provincesStatus])

    useEffect(() => {
        if (periodsStatus === 'SUCCESS') {
            setPeriods(periodsData.list)
        }
        setPeriodsPost(false)
    }, [periodsStatus])

    useEffect(() => {
        if (tendenciesStatus === 'SUCCESS') {
            setTendencies(tendenciesData.list)
        }
        setTendenciesPost(false)
    }, [tendenciesStatus])

    useEffect(() => {
        if (subTendenciesStatus === 'SUCCESS') {
            setSubTendencies(subTendenciesData.list)
        }
    }, [subTendenciesStatus])

    useEffect(() => {
        if (chanceStatus === 'SUCCESS') {
            setShowMore(chanceData.list.length === 20)
            let temp = [...chances.list, ...chanceData.list]
            setChances({...chances, list: temp})
            setChancePost(false)
        }
    }, [chanceStatus])

    useEffect(() => {
        dispatch.setLoading([chanceStatus, saveStatus].includes('LOADING'))
    }, [chanceStatus, saveStatus])

    return <div className={'w-100 container'}>
        <Header code={state.data.code} getUrl={getUrl} group={group}/>
        <div className={'box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h4 className={'text-center mb-5'}> (تعیین شانس‌ها و احتمال قبولی)</h4>
            <div className={'w-100'}>
                <form key={filterKey} action=""
                      className={'d-flex flex-column flex-lg-row  w-100 justify-content-around my-4'}>
                    <div>
                        <label htmlFor="">
                            استان
                        </label>

                        <select name="" id="" className={'form-control'} onChange={(e) => {
                            setSelectedProvince(e.target.value !== '' ? {id: e.target.value} : null)
                        }}>
                            <option value="">همه استان‌ها</option>
                            {
                                provinces.map((item, index) => {
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">
                            گرایش
                        </label>

                        <select onChange={(e) => {
                            setSelectedTendency(e.target.value !== '' ? {id: e.target.value} : null)
                        }} name="" id="" className={'form-control'}>
                            <option value="">همه گرایش‌ها</option>
                            {
                                tendencies.map((item, index) => {
                                    return <option value={item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    {
                        selectedTendency !== null && <div>
                            <label htmlFor="">
                                زیر گرایش
                            </label>
                            <select name="" id="" className={'form-control'} onChange={(e) => {
                                setSelectedSubTendency(e.target.value !== '' ? {id: e.target.value} : null)
                            }}>
                                <option value="">همه زیر گرایش‌ها</option>
                                {
                                    subTendencies.map((item, index) => {
                                        return <option value={item.id}>{item.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                    <div>
                        <label htmlFor="">
                            دوره
                        </label>
                        <select name="" id="" className={'form-control'} onChange={(e) => {
                            setSelectedPeriod(e.target.value !== '' ? {id: e.target.value} : null)
                        }}>
                            <option value="">همه‌ دوره‌ها</option>
                            {
                                periods.map((item, index) => {
                                    return <option value={item.id}>{periodsLabel(item.name)}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">
                            نمایش
                        </label>
                        <select name="" id="" value={view} className={'form-control'} onChange={(e) => {
                            setView(parseInt(e.target.value))
                        }}>
                            <option value={0}>همه</option>
                            <option value={1}>فقط انتخاب شده‌ها</option>
                        </select>
                    </div>
                </form>
                <div className={'d-flex justify-content-center mb-3'}>
                    <button onClick={() => {
                        setPage(1)
                        setChances({list: []})
                        setChancePost(true)
                    }} className={'btn btn-primary'}>اعمال تغییرات
                    </button>
                    <button onClick={() => {
                        setSelectedSubTendency(null)
                        setSelectedPeriod(null)
                        setSelectedProvince(null)
                        setSelectedTendency(null)
                        setFilterKey(filterKey + 1)
                        setPage(1)
                        setChances({list: []})
                        setChancePost(true)
                    }} className={'btn btn-danger mx-2'}>پاک کردن فیلتر‌ها
                    </button>
                </div>
                <div className={'table-responsive'}>
                    <table className={'table'}>
                        <thead>
                        <tr>
                            <th>انتخاب</th>
                            <th>ردیف</th>
                            <th>شانس قبولی</th>
                            <th>رشته/گرایش</th>
                            <th>دانشگاه/دوره</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            chances.list.filter(item => {
                                if (view) {
                                    return item.selected
                                } else {
                                    return true
                                }
                            }).map((item, index) => {
                                return <tr key={index}>
                                    <td>
                                        <input type="checkbox" checked={chances.list[index].selected}
                                               className={'form-control'} onChange={(e) => {
                                            let flag = true
                                            if (e.target.value) {
                                                if (state.selectedChance.length === 100) {
                                                    flag = false
                                                    cogoToast.error('انتخاب بیش از ۱۰۰ آیتم مجاز نیست', {
                                                        hideAfter: 10
                                                    })
                                                }
                                            }
                                            if (flag) {
                                                let temp = chances.list
                                                temp[index].selected = e.target.checked
                                                let selectedList = temp.filter(item => item.selected)
                                                dispatch.setSelectedChance(selectedList)
                                                Store.store('chance-selected', {data: selectedList})
                                                setChances({...chances, list: temp})
                                            }
                                        }}/>
                                    </td>
                                    <td>{index+1}</td>
                                    <td>
                                        <p className={'text-' + chanceLabel(item.label)[1]}>{chanceLabel(item.label)[0]}</p>
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
                    {
                        showMore &&
                        <button className={'btn btn-dark mb-5'} onClick={() => setPage(page + 1)}>بیشتر {">"}{">"}</button>
                    }
                </div>
                <button className={'btn btn-info'} onClick={() => {
                    setSavePost(true)
                }}>ذخیره
                </button>
                {showPriority && <button className={'btn btn-primary mx-2'} onClick={() => {
                    if(chances.list.filter(item => item.selected).length > 0){
                        history.push(getUrl(routes.priority))
                    }else{
                        cogoToast.error('لطفا حداقل یک شانس قبولی را انتخاب نمایید.')
                    }
                }}>اولویت بندی</button>
                }
            </div>
        </div>
        <Footer/>
    </div>
}
