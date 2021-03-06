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

    function paymentType() {
        if (['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType)) {
            if (group === 1) {
                return 'ENTEKHAB_BEHDASHT'
            } else {
                return 'ENTEKHAB_OLOOM'
            }
        } else if (['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType)) {
            if (group === 1) {
                return 'TAKHMIN_BEHDASHT'
            } else {
                return 'TAKHMIN_OLOOM'
            }
        } else {
            if (group === 1) {
                return 'UPGRADE'
            } else {
                return 'UPGRADE'
            }

        }
    }

    function callBack() {
        if (['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM'].includes(pageType)) {
            return location.pathname.replace('/', '').replace('pay', 'level')
        } else if (pageType === 'UPGRADE') {
            return location.pathname.replace('/', '').replace('chance', 'level')
        } else {
            return location.pathname.replace('/', '')
        }
    }

    const [payData, payStatus] = useApi(
        preProcessUser('pay', {
            userId,
            packages: packageSelected,
            callback: callBack(),
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
        setLoading([payStatus, offStatus,packagesStatus].includes('LOADING'))
    }, [payStatus, offStatus])

    useEffect(() => {
        if (packagesStatus === 'SUCCESS') {
            setPackages(packagesData.list)
            if (pageType === 'UPGRADE' && packagesData.list.length > 0) {
                setPackageSelected([packagesData.list[0].id])
            }
        }
    }, [packagesStatus])

    useEffect(() => {
        if (offStatus === 'SUCCESS') {
            if (offData.percentage !== null) {
                console.log(offData.percentage)
                console.log(parseInt(offData.percentage * sumPrice))
                setOffValue(parseInt(offData.percentage * sumPrice))
                setOffCodeFinal(offCode)
                cogoToast.success('???? ?????????? ???? ???????????? ?????????? ??????????.')
            } else if (offData.amount) {
                setOffValue(offData.amount)
                setOffCodeFinal(offCode)
                cogoToast.success('???? ?????????? ???? ???????????? ?????????? ??????????.')
            } else {
                setOffValue(0)
                cogoToast.error('???? ?????????? ???????? ?????? ???????????? ??????')
            }
        }
        setOffPost(false)
    }, [offStatus])

    useEffect(() => {
        let temp = packageSelected;
        let s = 0
        packages.forEach(item => {
            if (temp.includes(item.id)) {
                s += item.price
            }
        })
        setSumPrice(s)
    }, [packageSelected])

    return <div>
        {
            ['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType) &&
            <p className={'alert alert-info'}>???????? ???????? ?????????????? ???????????? ?????? ???? ????????????????? ?????? ???? ?????????????? ????????????.</p>
        }
        <form onSubmit={(e) => {
            e.preventDefault()
            if (packageSelected.length > 0) {
                if (['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType)) {
                    setPostPay(true)
                } else {
                    setPostPay(true)
                }
            } else {
                cogoToast.error('???????? ???????? ???????? ?????? ???? ???????????? ????????????.')
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
                    setPackageSelected(temp)
                }
                }>
                    {['TAKHMIN_BEHDASHT', 'TAKHMIN_OLOOM'].includes(pageType) && packages.map((item, index) => {
                        return <label key={index} htmlFor={`package-${item.id}`} className={'col-12'}>
                            <input type={type} name={'package'} value={item.id} id={item.id} className={'mx-2'}/>
                            ?????????? {item.number} ?????????????? ???? ???????? {item.price} ??????????
                        </label>
                    })}
                    {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM', 'UPGRADE'].includes(pageType) && packages.map((item, index) => {
                        return <div className={'col p-2'}>
                            <div className={'card p-0 h-100'}>
                                <div className="card-header package-header text-white mb-4">
                                    <h4>{item.name}</h4>
                                </div>
                                <div className={'h-100 d-flex justify-content-center flex-column'}>
                                    {
                                        item.features.map(f => {
                                            return <div className={'mx-5 border-bottom py-4 d-flex align-items-center'}>
                                                <div className={'img-feature mx-3'}>
                                                    <img src={checkboxLogo} alt="" className={'w-100 p-0'}/>
                                                </div>
                                                <p className={'m-0 h5'}>{f.title}</p>
                                            </div>
                                        })
                                    }
                                </div>

                                <div className={'py-3'}>
                                    <p className={'m-0 badge badge-info price-badge'}>????????: <b>{item.price} ??????????</b>
                                    </p>
                                </div>
                                <div className={'d-flex justify-content-center pb-2'}>
                                    <button type={'button'}
                                            className={`btn btn-${packageSelected.includes(item.id) ? 'primary' : 'outline-primary'}`}
                                            onClick={() => {
                                                let value = parseInt(item.id)
                                                setPackageSelected([value])
                                            }}>{packageSelected.includes(item.id) ? '???????????? ??????' : '????????????'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}
                </div>

                {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM', 'UPGRADE'].includes(pageType) &&
                <div className={'d-flex justify-content-center mt-4'}>
                    <p className={' h5 m-0'}>???????? : {sumPrice - offValue < 0 ? 0 : sumPrice - offValue} ?????????? </p>
                </div>}
                <div className={'d-flex flex-column align-items-center justify-content-center'}>
                    {['ENTEKHAB_BEHDASHT', 'ENTEKHAB_OLOOM', 'UPGRADE'].includes(pageType) &&
                    <div className={'d-flex mt-4'}>
                        <InputNumber className={'form-control'} value={offCode} onchange={(v) => setOffCode(v)}
                                     placeHolder={'???? ??????????'} type="text"/>
                        <button type={'button'} className={'btn btn-primary'} onClick={() => setOffPost(true)}>??????????
                        </button>
                    </div>}
                    <button className={'btn btn-success mt-3 col-lg-6'}>????????????</button>
                </div>

            </div>
        </form>
    </div>
}
