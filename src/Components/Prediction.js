import React, {useContext, useEffect, useState,useRef} from 'react'
import Select from "./Select";
import InputNumber from "./InputNumber";
import {Modal} from "react-bootstrap";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import SpinnerLoading from "./Spinner";
import Store from "../Storage/Store";
import {numberWithCommas} from "../HelperFunction";
import cogoToast from "cogo-toast";

export default function Prediction({parentEndRef,setLoading}){
    const [groups, setGroups] = useState([])
    const [fields, setFields] = useState([])
    const [tendencies, setTendencies] = useState([])
    const [courses, setCourses] = useState([])
    const [predictions, setPredictions] = useState([])
    const [getCourses, setGetCourses] = useState(false)
    const [getPrediction, setGetPrediction] = useState(false)
    const [validations, setValidations] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [selectedField, setSelectedField] = useState(null)
    const [selectedTendencies, setSelectedTendencies] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [ave, setAve] = useState('')
    const [aveValidation, setAveValidation] = useState(false)
    const [step,setStep] = useState(0)
    const [mobile,setMobile] = useState('')
    const [code,setCode] = useState('')
    const [postRegister,setPostRegister] = useState(false)
    const [postConfirm,setPostConfirm] = useState(false)
    const [mobileValidationState,setMobileValidationState] = useState(false)
    const [codeValidation,setCodeValidation] = useState(false)
    const [freeTries,setFreeTries] = useState(0)
    const [postTakhminFree,setPostTakhminFree] = useState(false)
    const [packageSelected ,setPackageSelected] = useState(null)
    const [postPay ,setPostPay] = useState(false)
    const [packages]=useState([{number:1,amount:1500},{number:3,amount:4000},{number:5,amount:5000}])
    const initialResendTimer = 5;
    const [resendTimer, setResendTimer] = useState(initialResendTimer);
    const timer = useRef(false);

    const [groupsData, groupsStatus] = useApi(
        preProcessUser('groups', {}),
        postProcessUser, [],
        true);

    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fields', {id: selectedGroup?.id}),
        postProcessUser, [selectedGroup],
        selectedGroup);

    const [tendenciesData, tendenciesStatus] = useApi(
        preProcessUser('tendencies', {id: selectedField?.id}),
        postProcessUser, [selectedField],
        selectedField && selectedField?.hasSubtendancy);

    const [coursesData, coursesStatus] = useApi(
        preProcessUser('courses', selectedTendencies ? {
            field: {id: selectedField?.id},
            subtendancy: {id: selectedTendencies ?? null}
        } : {field: {id: selectedField?.id}}),
        postProcessUser, [getCourses],
        getCourses);

    const [predictionData, predictionStatus] = useApi(
        preProcessUser('prediction', {courses: courses, ave, field: selectedField?.id, group: selectedGroup?.id,mobile}),
        postProcessUser, [getPrediction],
        getPrediction);

    const [registerData, registerStatus] = useApi(
        preProcessUser('register', {mobile}),
        postProcessUser, [postRegister],
        postRegister);

    const [confirmData, confirmStatus] = useApi(
        preProcessUser('confirm', {code,mobile}),
        postProcessUser, [postConfirm],
        postConfirm);

    const [takhminFreeData, takhminFreeStatus] = useApi(
        preProcessUser('takhminFree', {mobile}),
        postProcessUser, [postTakhminFree],
        postTakhminFree);

    const [payData, payStatus] = useApi(
        preProcessUser('pay', {mobile,number:packages[packageSelected]?.number??0,amount:packages[packageSelected]?.amount??0}),
        postProcessUser, [postPay],
        postPay && packageSelected!==null);

    useEffect(()=>{
        setLoading([takhminFreeStatus,confirmStatus,registerStatus,predictionStatus,coursesStatus,tendenciesStatus,fieldsStatus,groupsStatus,payStatus].includes('LOADING'))
    },[takhminFreeStatus, confirmStatus, registerStatus, predictionStatus, coursesStatus, tendenciesStatus, fieldsStatus, groupsStatus,payStatus])
    useEffect(()=>{
        Store.get('MOBILE_USER').then(mobile=>{
                setMobile(mobile)
        })
    },[])

    useEffect(() => {
        setFields([])
        setTendencies([])
        setCourses([])
        setSelectedField(null)
        setSelectedTendencies(null)
    }, [selectedGroup])

    useEffect(() => {
        setTendencies([])
        setCourses([])
        setSelectedTendencies(null)
        setAve(null)
    }, [selectedField])

    useEffect(() => {
        setCourses([])
        setValidations([])
        setAve(null)
    }, [selectedTendencies])

    useEffect(() => {
        if (groupsStatus === 'SUCCESS') {
            setGroups(groupsData.list)
        }
    }, [groupsStatus])

    useEffect(() => {
        if (fieldsStatus === 'SUCCESS') {
            setFields(fieldsData.list)
        }
    }, [fieldsStatus])

    useEffect(() => {
        if (tendenciesStatus === 'SUCCESS') {
            setTendencies(tendenciesData.list)
        }
    }, [tendenciesStatus])

    useEffect(() => {
        if (coursesStatus === 'SUCCESS') {
            setValidations(coursesData.list.map(() => {
                return false;
            }))
            setCourses(coursesData.list)
        }
        setGetCourses(false)
    }, [coursesStatus])

    useEffect(() => {
        if (predictionStatus === 'SUCCESS') {
            setPredictions(predictionData.list)
            setFreeTries(predictionData.list[0]?.freeTries??0)
            if (predictionData.list[0]?.freeTries??0 === 0){
                cogoToast.error('لطفا برای درخواست بیشتر، پکیج های پیشنهادی را خریداری نمایید');
                setStep(4)
            }
        }
        setGetPrediction(false)
    }, [predictionStatus])

    useEffect(() => {
        if (predictions.length > 0) {
            setShowModal(true)
        }
    }, [predictions])

    useEffect(() => {
        if (selectedField && !selectedField.hasSubtendancy) {
            setTendencies([])
            setGetCourses(true)
        }
    }, [selectedField])

    useEffect(() => {
        if (selectedTendencies) {
            setGetCourses(true)
        }
    }, [selectedTendencies])

    useEffect(() => {
        if (registerStatus === 'SUCCESS') {
            setResendTimer(initialResendTimer)
                timer.current = setInterval(() => {
                    setResendTimer((prevState) => {
                        if (prevState === 1) {
                            clearTimeout(timer.current);
                        }
                        return prevState - 1;
                    });
                }, 1000);

            setStep(2)
        }
        setPostRegister(false)
    }, [registerStatus])

    useEffect(() => {
        if (confirmStatus === 'SUCCESS') {
            if (confirmData.code ==='1'){
                setFreeTries(confirmData.freeTries)
                Store.store('MOBILE_USER', mobile).then();
                if (confirmData.freeTries ===0){
                    setStep(4)
                }else{
                    setStep(3)
                }
                setCodeValidation(false)

            }else{
                setCodeValidation(true)
            }
        }
        setPostConfirm(false)
    }, [confirmStatus])

    useEffect(() => {
        if (takhminFreeStatus === 'SUCCESS') {
            setFreeTries(takhminFreeData.freeTries)
            if (takhminFreeData.freeTries === 0){
                setStep(4)
            }else{
                setStep(3)
            }
        }
        setPostTakhminFree(false)
    }, [takhminFreeStatus])


    useEffect(() => {
        parentEndRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }, [courses, fields, tendencies])

    function selectFieldHandle(value) {
        let filtered = fields.filter(item => {
            return item.id.toString() === value;
        })
        setSelectedField(filtered !== [] ? filtered[0] : null)
    }

    function selectGroupHandle(value) {
        let filtered = groups.filter(item => {
            return item.id.toString() === value;
        })
        setSelectedGroup(filtered !== [] ? filtered[0] : null)
    }

    function textInputOnChange(v, index) {
        if (v >= -33.33 && v <= 100) {
            let temp = courses;
            temp[index].percentage = v;
            setCourses(temp)
            let validationTemp = validations;
            validationTemp[index] = false
            setValidations(validationTemp)
            setCourses([...courses])

        } else {
            let validationTemp = validations;
            validationTemp[index] = true
            setValidations(validationTemp)
            setCourses([...courses])
        }
    }

    function validationCourses() {
        let validArray = courses.map((item) => {
            return !((![null, ''].includes(item.percentage)) && item.percentage >= -33.33 && item.percentage <= 100)
        })
        setValidations(validArray)
        setCourses([...courses])
        let aveV = !(ave <= 20 && ave >= 10)
        setAveValidation(aveV)

        return !validArray.includes(true) && !aveV
    }

    function hideModal() {
        setShowModal(false)
    }

    function mobileValidation(){
        return mobile.match(/09([0-9][0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/)
    }

    return <>
        <SpinnerLoading
            show={true}/>
        {step===0 && <div className={'d-flex flex-column align-items-center'}>
            <button className={'btn btn-primary '} style={{fontSize:'2rem'}} onClick={()=>{
                if (mobile){
                    setPostTakhminFree(true)
                }else{
                    setStep(1)
                }
            }
            }>
                <i className="bi bi-award-fill"></i>
                رتبه من را تخمین بزن
                <i className="bi bi-award-fill"></i>
            </button>
            <div className={'d-flex mt-3'}>
                <i className="bi bi-hand-index-thumb-fill text-warning mx-2" style={{fontSize:'2rem'}}></i>
                <i className="bi bi-hand-index-thumb-fill text-warning mx-2" style={{fontSize:'2rem'}}></i>
                <i className="bi bi-hand-index-thumb-fill text-warning mx-2" style={{fontSize:'2rem'}}></i>
            </div>
        </div>}
        {step === 1 &&
        <div className={'d-flex justify-content-center'}>
            <form onSubmit={(e)=>{
                e.preventDefault();
                console.log(mobileValidation());
                if (mobileValidation()){
                    setPostRegister(true);
                    setMobileValidationState(false)
                }else{
                    setMobileValidationState(true)
                }
            }
            } className={'col-12 col-lg-6 d-flex flex-column align-items-center'}>
                <div className={'has-validation'}>
                    <label htmlFor="">لطفا شماره موبایل خود را وارد نمایید</label>
                    <InputNumber className={`form-control ${mobileValidationState?'is-invalid':''}`} type={'integer'} onchange={(val)=>setMobile(val)}/>
                    <p className={'invalid-feedback'}>شماره موبایل وارد شده اشتباه است</p>
                </div>

                <button className={'btn btn-primary mt-3'}>مرحله بعد</button>
            </form>
        </div>}
        {step===2 &&
        <div className={'d-flex justify-content-center'}>
            <form className={'col-12 col-lg-6 d-flex flex-column align-items-center text-center'} onSubmit={(e)=>{
                e.preventDefault();
                if (code){
                    setPostConfirm(true)
                }else{
                    setCodeValidation(true)
                }
            }
            }>
                <div className={'has-validation'}>
                    <label htmlFor="">کد دریافت شده از طریق پیامک را وارد نمایید</label>
                    <InputNumber className={`form-control ${codeValidation?'is-invalid':''}`} value={code} type={'integer'} onchange={(val)=>setCode(val)}/>
                    <p className={'invalid-feedback'}>کد وارد شده اشتباه است</p>
                </div>
                <button className={'btn btn-primary mt-3'}>مرحله بعد</button>
                <button className={'btn btn-secondary mt-3'} type={'button'} onClick={()=> {
                    if (resendTimer<=0){
                        setPostRegister(true)
                    }
                }} disabled={resendTimer>0}>{resendTimer>0?`${resendTimer} مانده تا ارسال دوباره یا ویرایش شماره موبایل`:'ارسال دوباره'}</button>
                {resendTimer <= 0 && <button className={'btn btn-info mt-3'} type={'button'} onClick={()=> {
                    clearTimeout(timer.current);
                    setStep(1)
                }}>ویرایش شماره موبایل</button>}
            </form>
        </div>}
        <div>
            {[3,4].includes(step) && <button className={'btn btn-primary mb-2'} onClick={()=>{
                Store.remove('MOBILE_USER')
                setMobile('')
                setStep(1)
            }}>ویرایش شماره موبایل</button>}
            {step===3 && <>
                <div className={'alert alert-success'}>
                    تعداد درخواست باقی‌مانده: {freeTries}
                </div>
                <form className={'d-flex flex-wrap justify-content-center w-100'}>
                    <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">گروه خود را انتخاب کنید:</label>
                        <Select placeHolder={'انتخاب گروه'} options={groups}
                                onChange={value => selectGroupHandle(value)}/>
                    </div>
                    {fields.length > 0 && <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">رشته خود را انتخاب کنید:</label>
                        <Select placeHolder={'انتخاب رشته'} options={fields}
                                onChange={value => selectFieldHandle(value)}/>
                    </div>}
                    {tendencies.length > 0 && <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">گرایش خود را انتخاب کنید:</label>
                        <Select placeHolder={'انتخاب گرایش'} options={tendencies}
                                onChange={value => setSelectedTendencies(value)}/>
                    </div>}
                </form>
                {courses.length > 0 && <div className={'d-flex flex-column align-items-center'}>
                    <div className={'table-responsive'}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">نام درس</th>
                                <th scope="col">درصد (33.33- تا 100)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {validations && courses.map((item, index) => {
                                return <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className={'has-validation'}>
                                            <InputNumber onchange={(v) => textInputOnChange(v, index)}
                                                         type={'float'}
                                                         className={`form-control w-100 banner ${validations[index] ? "is-invalid" : ""}`}/>
                                            <div className={'invalid-feedback p-2 bg-danger text-white rounded'}>
                                                مقدار مجاز 33.33- تا 100 می‌باشد
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        <div className={'has-validation mx-5 mb-5 text-center bg-main rounded p-3'}>
                            <label htmlFor="select">معدل خود را وارد کنید(از ۱۰ تا ۲۰):</label>
                            <InputNumber placeHolder={'مثال: 14.5'} value={ave} type={'float'} onchange={(v) => setAve(v)}
                                         className={`form-control ${aveValidation ? 'is-invalid' : ''}`}/>
                            <div className={'invalid-feedback p-2 bg-danger text-white rounded'}>
                                مقدار مجاز 10 تا 20 می‌باشد
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        if (validationCourses()) {
                            setGetPrediction(true)
                        }
                    }} className={'btn btn-primary mt-3'}> رتبه
                        من
                        را نشان بده
                    </button>
                </div>}
                <Modal show={showModal} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>اعلام نتایج</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {predictions.length > 0 && <div className={'mt-3'}>
                            <div className={'text-center'} style={{fontSize:'2rem'}}>
                                رتبه تخمینی شما از
                                <span className={'badge badge-success mx-2'}>{numberWithCommas(predictions[0].rank)}</span>
                                تا
                                <span className={'badge badge-warning mx-2'}>{numberWithCommas(predictions[2].rank)}</span>
                                خواهد بود.
                            </div>
                        </div>}
                        <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                onClick={hideModal}>بستن
                        </button>
                    </Modal.Body>
                </Modal>
            </>}
            {step===4&& <div>
                <p className={'alert alert-info'}>لطفا برای درخواست بیشتر، یکی از پکیج‌های زیر را خریداری نمایید.</p>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    setPostPay(true)
                }}>
                    <div className={'card p-5'} onChange={(e)=>{
                        setPackageSelected(e.target.value)
                    }
                    }>
                        {packages.map((item,index)=>{
                            return  <label htmlFor={`package-${index}`}>
                                <input type="radio" name={'package'} value={index} id={`package-${index}`} className={'mx-2'}/>
                                تعداد {item.number} درخواست به مبلغ {item.amount} تومان
                            </label>
                        })}
                        <button className={'btn btn-success mt-3'} disabled={packageSelected===null}>پرداخت</button>
                    </div>
                </form>
            </div>}
        </div>

    </>
}
