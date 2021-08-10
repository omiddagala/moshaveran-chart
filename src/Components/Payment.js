import React, {useEffect, useState} from "react";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import {useLocation} from 'react-router-dom'
import cogoToast from "cogo-toast";
import InputNumber from "./InputNumber";
import checkboxLogo from "../assets/checkbox.png"

export default function Payment({userId, setLoading, group, type = 'radio', pageType = 'TAKHMIN_BEHDASHT'}) {
    const [packageSelected, setPackageSelected] = useState([])
    const [postPay, setPostPay] = useState(false)
    const [sumPrice, setSumPrice] = useState(0)
    const [offCode, setOffCode] = useState('')
    const [offCodeFinal, setOffCodeFinal] = useState('')
    const [offPost, setOffPost] = useState(false)
    const [offValue, setOffValue] = useState(0)
    const location = useLocation();
    const [packages, setPackages] = useState([])
    const [tempPackages, setTempPackages] = useState([])

    function paymentType() {
        if (['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType)) {
            if (group === 1) {
                return 'ENTEKHAB_BEHDASHT'
            } else {
                return 'TAKHMIN_OLOOM'
            }
        } else {
            if (group === 1) {
                return 'TAKHMIN_BEHDASHT'
            } else {
                return 'TAKHMIN_OLOOM'
            }
        }
    }

    const [payData, payStatus] = useApi(
        preProcessUser('pay', {
            userId,
            packages: packageSelected,
            callback: ['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType) ? location.pathname.replace('/', '').replace('pay', 'level') : location.pathname.replace('/', ''),
            paymentType: paymentType(),
            offCode: offCodeFinal
        }),
        postProcessUser, [postPay],
        postPay && packageSelected !== null);

    const [packagesData, packagesStatus] = useApi(
        preProcessUser('packages', {type: pageType}),
        postProcessUser, [],
        true);

    const [offData, offStatus] = useApi(
        preProcessUser('off', {code: offCode.toString()}),
        postProcessUser, [offPost],
        offPost);

    useEffect(() => {
        setLoading([payStatus, offStatus].includes('LOADING'))
    }, [payStatus, offStatus])

    useEffect(() => {
        if (packagesStatus === 'SUCCESS') {
            console.log(packagesData.list);
            setPackages(packagesData.list)
        }
    }, [packagesStatus])

    useEffect(() => {
        if (offStatus === 'SUCCESS') {
            if (offData.amount) {
                setOffValue(offData.amount)
                setOffCodeFinal(offCode)
                cogoToast.success('کد تخفیف با موفقیت اعمال گردید.')
            } else {
                setOffValue(0)
                cogoToast.error('کد تخفیف وارد شده اشتباه است')
            }
        }
        setOffPost(false)
    }, [offStatus])

    return <div>
        {
            ['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType) &&
            <p className={'alert alert-info'}>لطفا برای درخواست بیشتر، یکی از پکیج‌های زیر را خریداری نمایید.</p>
        }
        <form onSubmit={(e) => {
            e.preventDefault()
            if (packageSelected.length > 0) {
                if (['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType)) {
                    setPostPay(true)
                } else {
                    let require = packages.filter(item => item.number === 0)[0]
                    if (packageSelected.includes(require.id)) {
                        setPostPay(true)
                    } else {
                        cogoToast.error(`انتخاب پکیج \'${require.name}\' اجباری است `)
                    }
                }
            } else {
                cogoToast.error('لطفا پکیج مورد نظر را انتخاب نمایید.')
            }
        }}>
            <div className={'box bg-white p-lg-5 p-0 d-flex flex-column'}>
                <div className={'d-flex flex-wrap'} onChange={(e) => {
                    let temp = packageSelected;
                    let value = parseInt(e.target.value)
                    if (e.target.type === 'radio') {
                        temp = [value]
                    } else {
                        if (temp.includes(value)) {
                            temp = temp.filter(item => item !== value);
                        } else {
                            temp.push(value)
                        }
                    }

                    let s = 0
                    packages.forEach(item => {
                        if (temp.includes(item.id)) {
                            s += item.price
                        }
                    })
                    setSumPrice(s)
                    setPackageSelected(temp)
                }
                }>
                    {['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType) && packages.map((item, index) => {
                        return <label key={index} htmlFor={`package-${item.id}`} className={'col-12'}>
                            <input type={type} name={'package'} value={item.id} id={item.id} className={'mx-2'}/>
                            تعداد {item.number} درخواست به مبلغ {item.price} تومان
                        </label>
                    })}
                    {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType) && packages.map((item, index) => {
                        return <div className={'col-12 col-lg-6 p-2'}>
                            <div className={'card p-0'}>
                                <div className="card-header package-header text-white">
                                    <h4>{item.name}</h4>
                                </div>
                                {
                                    item.features.map(f => {
                                        return <div className={'mx-5 border-bottom py-4 d-flex align-items-center justify-content-center'}>
                                            <div className={'img-feature mx-2'}>
                                                <img src={checkboxLogo} alt="" className={'w-100 p-0'}/>
                                            </div>
                                            <p className={'m-0 h5'}>{f.title}</p>
                                        </div>
                                    })
                                }
                                <div className={'py-3'}>
                                    <p className={'m-0 badge badge-info price-badge'}>قیمت: <b>{item.price} تومان</b></p>
                                </div>
                                <div className={'d-flex justify-content-center pb-2'}>
                                    <button type={'button'}
                                            className={`btn btn-${packageSelected.includes(item.id) ? 'primary' : 'outline-primary'}`}
                                            onClick={() => {
                                                let temp = packageSelected;
                                                let value = parseInt(item.id)

                                                if (temp.includes(value)) {
                                                    temp = temp.filter(item => item !== value);
                                                } else {
                                                    temp.push(value)
                                                }
                                                let s = 0
                                                packages.forEach(item => {
                                                    if (temp.includes(item.id)) {
                                                        s += item.price
                                                    }
                                                })
                                                setSumPrice(s)
                                                setPackageSelected(temp)
                                            }}>{packageSelected.includes(item.id)?'انتخاب شده':'انتخاب'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType) &&
                <div className={'d-flex justify-content-center mt-4'}>
                    <p className={' h5 m-0'}>قیمت : {sumPrice === 0 ? sumPrice : sumPrice - offValue} تومان </p>
                </div>}
                <div className={'d-flex flex-column align-items-center justify-content-center'}>
                    {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType) && <div className={'d-flex mt-4 col-lg-6'}>
                        <InputNumber className={'form-control'} value={offCode} onchange={(v) => setOffCode(v)}
                                     placeHolder={'کد تخفیف'} type="text"/>
                        <button type={'button'} className={'btn btn-primary'} onClick={() => setOffPost(true)}>اعمال
                        </button>
                    </div>}
                    <button className={'btn btn-success mt-3 col-lg-6'}>پرداخت</button>
                </div>

            </div>
        </form>
    </div>
}
