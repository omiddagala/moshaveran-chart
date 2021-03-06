import React, {useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import Select from "../../Components/Select";
import Store from "../../Storage/Store";
import {useHistory} from "react-router-dom";
import Header from "./Components/Header";
import routes from "./routes";
import cogoToast from "cogo-toast";
import Info from "./Components/Info";

export default function FirstStep({group, state, dispatch, getUrl, year}) {
    const [fields, setFields] = useState([])
    const [benefits, setBenefits] = useState([])
    const [firstPost, setFirstPost] = useState(false)
    const [invalid, setInvalid] = useState({
        filed: false,
        benefit: false
        // ave:false
    })
    const [changeKey, setChangeKey] = useState(0)
    const [editKey, setEditKey] = useState(0)
    const [fieldDescription, setFieldDescription] = useState('')

    const history = useHistory()
    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fieldsChoice', {group: group}),
        postProcessUser, [],
        true);

    const [benefitsData, benefitsStatus] = useApi(
        preProcessUser('shares', {}),
        postProcessUser, [],
        true);

    const [firstData, firstStatus, statusCode] = useApi(
        preProcessUser('first', {
            id: state.data.id,
            code: state.data.code,
            mobile: state.data.mobile,
            group: state.data.group,
            fieldOfChoice: state.data.field,
            share: state.data.share,
            ave: state.data.ave
        }),
        postProcessUser, [firstPost],
        firstPost);

    useEffect(() => {
        if (fieldsStatus === 'SUCCESS') {
            setFields(fieldsData.list)
        }
    }, [fieldsStatus])

    useEffect(() => {
        if (benefitsStatus === 'SUCCESS') {
            setBenefits(benefitsData.list)
        }
    }, [benefitsStatus])

    function validation() {
        let invalidArr = {
            fieldOfChoice: [NaN, null].includes(state.data.fieldOfChoice.id),
            benefit: [NaN, null].includes(state.data.share.id),
            // ave : state.data.ave === ''
        }

        setInvalid(invalidArr)
        if (!Object.values(invalidArr).includes(true)) {
            if (editKey > changeKey) {
                setChangeKey(editKey)
                setFirstPost(true)
            } else {
                history.push(getUrl(routes.second))
            }
        }
    }

    useEffect(() => {
        if (firstStatus === 'SUCCESS') {
            Store.store('data-choice', {data: {...state.data, id: firstData.list.id}}).then(d => {
                    dispatch.setData({...state.data, id: firstData.list.id, state: 'FIRST'})
                    history.push(getUrl(routes.second))
                }
            )
        } else {
            if (statusCode === 501) {
                cogoToast.error('پس از پرداخت امکان ویرایش اطلاعات وجود ندارد.با کد اختصاصی جدید وارد شوید', {
                    hideAfter: 10
                })
                history.push(getUrl(routes.home))
            }
        }
    }, [firstStatus])

    useEffect(() => {
        dispatch.setLoading([firstStatus, benefitsStatus, firstStatus].includes('LOADING'))
    }, [firstStatus, benefitsStatus, firstStatus])

    return <div className={'w-100 container'}>
        <Header code={state.data.code} getUrl={getUrl} group={group} year={year}/>
        <div className={'box p-lg-5 pt-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <form className={'col-12 col-lg-8 py-2'} onSubmit={(e) => {
                e.preventDefault()
                validation()
            }} action="">
                <h4 className={'text-center mb-4'}>مرحله اول</h4>
                {/*<Info text={'راهنمای تستی'}/>*/}
                <div className={'has-validation'}>
                    {fields.length > 0 && <div className={'mb-5'}>
                        <label htmlFor="">رشته امتحانی</label>
                        <Select placeHolder={'انتخاب رشته'} options={fields}
                                className={invalid.fieldOfChoice ? 'is-invalid' : ''}
                                value={state.data.fieldOfChoice?.id}
                                onChange={value => {
                                    setEditKey(editKey + 1)
                                    dispatch.setData({...state.data, fieldOfChoice: {id: parseInt(value)}})
                                    let selected = fields.filter(item => item.id === parseInt(value));
                                    if (selected.length === 1) {
                                        setFieldDescription(selected[0].description)
                                    } else {
                                        setFieldDescription('')
                                    }
                                }}/>
                        <p className={'invalid-feedback'}>لطفا رشته امتحانی را وارد نمایید.</p>
                    </div>}
                </div>

                {
                    fieldDescription && <p className={'alert alert-info'}>{fieldDescription}</p>
                }
                <div className={'has-validation'}>
                    {benefits.length > 0 && <div className={'mb-5 has-validation'}>
                        <label htmlFor="">سهمیه:</label>
                        <Select placeHolder={'انتخاب سهمیه'} options={benefits} value={state.data.share.id}
                                className={invalid.benefit ? 'is-invalid' : ''}
                                onChange={value => {
                                    setEditKey(editKey + 1)
                                    dispatch.setData({...state.data, share: {id: parseInt(value)}})
                                }}/>
                        <p className={'invalid-feedback'}>لطفا سهمیه را وارد نمایید.</p>
                    </div>}
                </div>

                {/*<p className={'alert alert-info'}>معدل موثر تا ۲۰ درصد در وضعیت کارنامه شما تاثیر گذار است.</p>*/}
                {/*<div className={'has-validation'}>*/}
                {/*    <label htmlFor="">معدل موثر</label>*/}
                {/*    <InputNumber value={state.data.ave} type={'float'} onchange={value=> {*/}
                {/*        setEditKey(editKey+1)*/}
                {/*        dispatch.setData({...state.data, ave: parseInt(value)})*/}
                {/*    }} className={`form-control ${invalid.ave?'is-invalid':''}`} />*/}
                {/*    <p className={'invalid-feedback'}>لطفا معدل موثر را وارد نمایید.</p>*/}
                {/*</div>*/}
                <div className={'w-100 d-flex justify-content-center'}>
                    <button type={'submit'} className={'btn btn-primary mt-3'}>مرحله بعد</button>
                </div>
            </form>
        </div>
    </div>
}
