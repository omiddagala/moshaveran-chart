import React, {useContext, useEffect, useState,useRef} from 'react'
import Select from "./Select";
import InputNumber from "./InputNumber";
import {Modal} from "react-bootstrap";
import useApi from "../useApi/useApi";
import {postProcessUser, preProcessUser} from "../useApi/preProcesses/UserProcesseApi";
import Store from "../Storage/Store";
import {numberWithCommas,mobileValidation} from "../HelperFunction";
import cogoToast from "cogo-toast";
import Payment from "./Payment";

export default function Prediction({setLoading,group}){
    const [key,setKey] = useState(1)
    const [selectedGroup,setSelectedGroup] = useState(null)
    const [fields, setFields] = useState([])
    const [tendencies, setTendencies] = useState([])
    const [courses, setCourses] = useState([])
    const [predictions, setPredictions] = useState([])
    const [getCourses, setGetCourses] = useState(false)
    const [getPrediction, setGetPrediction] = useState(false)
    const [validations, setValidations] = useState([])
    const [selectedField, setSelectedField] = useState(null)
    const [selectedTendencies, setSelectedTendencies] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [ave, setAve] = useState('')
    const [aveValidation, setAveValidation] = useState(false)
    const [step,setStep] = useState(1)
    const [mobile,setMobile] = useState('')
    const [code,setCode] = useState('')
    const [postRegister,setPostRegister] = useState(false)
    const [postConfirm,setPostConfirm] = useState(false)
    const [mobileValidationState,setMobileValidationState] = useState(false)
    const [codeValidation,setCodeValidation] = useState(false)
    const [freeTries,setFreeTries] = useState(0)
    const [postTakhminFree,setPostTakhminFree] = useState(false)
    const initialResendTimer = 180;
    const [resendTimer, setResendTimer] = useState(initialResendTimer);
    const timer = useRef(false);
    const endRef = React.createRef()
    const [mobileTemp,setMobileTemp] = useState(null)
    const [mobileEdit,setMobileEdit] = useState(null)
    const [keyEdit,setKeyEdit] = useState(0)
    const [changeKey,setChangeKey] = useState(0)

    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fields', {id: group}),
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
        preProcessUser('prediction', {courses: courses, ave, field: selectedField?.id, group: group,mobile, tendency: parseInt(selectedTendencies)}),
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
        preProcessUser('takhminFree',{userId:mobile}),
        postProcessUser, [postTakhminFree],
        postTakhminFree);

    function resetValues(){
        setSelectedField(null)
        setSelectedTendencies(null)
        setCode('')
    }

    useEffect(()=>{
     if (step === 3){
         setSelectedGroup(group)
     }
    },[step])

    useEffect(()=>{
        setLoading([takhminFreeStatus,confirmStatus,registerStatus,predictionStatus,coursesStatus,tendenciesStatus,fieldsStatus].includes('LOADING'))
    },[takhminFreeStatus, confirmStatus, registerStatus, predictionStatus, coursesStatus, tendenciesStatus, fieldsStatus])

    useEffect(()=>{
        Store.get('MOBILE_USER').then(mobile=>{
            if (mobile){
                setMobile(mobile)
                setStep(3)
                setPostTakhminFree(true)
            }
            else{
                setStep(1)
            }
        })
    },[])

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
            let free = predictionData.freeTries
            setPredictions(predictionData.subtendancies)
            setFreeTries(free)
            if (predictionData.subtendancies.length===0){
                cogoToast.error('????????????????? ???????? ??????.');
            }else{
                setPredictions(predictionData.subtendancies)
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
            try {
                clearTimeout(timer.current)
            }catch (e){}
            timer.current = setInterval(() => {
                setResendTimer((prevState) => {
                    if (prevState === 1) {
                        clearTimeout(timer.current);
                        setStep(1)
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
                setCode('')
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
        if (courses.concat(fields).concat(tendencies).length>0){
            endRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
        }
    }, [courses, fields, tendencies])

    function selectFieldHandle(value) {
        let filtered = fields.filter(item => {
            return item.id.toString() === value;
        })
        setSelectedField(filtered.length > 0 ? filtered[0] : null)
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



    function secondsToTimeString  (seconds) {

        let s = Math.floor(seconds%60);
        let m = Math.floor((seconds*1000/(1000*60))%60);
        let strFormat = "MM:SS";

        if(s < 10) s = "0" + s;
        if(m < 10) m = "0" + m;

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);

        return strFormat;
    }

    return <div ref={endRef}>
        {[1,2].includes(step) && mobileEdit && <button className={'btn btn-primary mb-2'} onClick={()=>{
            setMobile(mobileEdit)
            setMobileEdit('')
            Store.store('MOBILE_USER',mobileEdit)
            setKey(key+1)
            resetValues()
            setStep(3)
        }}>?????????? ???? ?????????? ???????????? ????????</button>}
        {step === 1 &&
        <div  key={'mobile'+ key} className={'d-flex justify-content-center'} >
            <form onSubmit={(e)=>{
                e.preventDefault();
                if (mobileValidation(mobile)){
                    if (mobileTemp !== mobile){
                        setPostRegister(true);
                    }else{
                        setStep(2)
                    }
                    setMobileValidationState(false)
                }else{
                    setMobileValidationState(true)
                }
            }
            } className={'col-12 col-lg-6 d-flex flex-column align-items-center'}>
                <div className={'has-validation'}>
                    <label htmlFor="">???????? ?????????? ???????????? ?????? ???? ???????? ????????????</label>
                    <label htmlFor="">?? ???????????????? ???? ?????????? ?????????????? ???? ???????????? ???????? ?? ???? ???? ?????????? ???????? ???????????? ?????????????? ???????????? ?????????????? ????????</label>
                    <InputNumber placeHolder="0912448XXXX" className={`form-control ${mobileValidationState?'is-invalid':''}`} type={'integer'} onchange={(val)=>setMobile(val)}/>
                    <p className={'invalid-feedback'}>?????????? ???????????? ???????? ?????? ???????????? ??????</p>
                </div>

                <button className={'btn btn-primary mt-3'}>?????????? ??????</button>
            </form>
        </div>}
        {step===2 &&
        <div key={'code'+ key} className={'d-flex justify-content-center'}>
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
                    <label htmlFor="">???? ???????????? ?????? ???? ???????? ?????????? ???? ???????? ????????????</label>
                    <InputNumber className={`form-control ${codeValidation?'is-invalid':''}`} value={code} type={'integer'} onchange={(val)=>setCode(val)}/>
                    <p className={'invalid-feedback'}>???? ???????? ?????? ???????????? ??????</p>
                </div>
                <button className={'btn btn-primary mt-3'}>?????????? ??????</button>
                <button className={'btn btn-secondary mt-3'} type={'button'} onClick={()=> {
                    if (resendTimer<=0){
                        setPostRegister(true)
                    }
                }} disabled={resendTimer>0}>{resendTimer>0?`${secondsToTimeString(resendTimer)} ?????????? ???? ?????????? ???????????? `:'?????????? ????????????'}</button>
                <button className={'btn btn-info mt-3'} type={'button'} onClick={()=> {
                    setMobileTemp(mobile)
                    setStep(1)
                    setCode('')
                }}>???????????? ?????????? ????????????</button>
            </form>
        </div>}
        <div key={'prediction'+ key}>
            {[3,4].includes(step) && <button className={'btn btn-primary mb-2'} onClick={()=>{
                Store.remove('MOBILE_USER')
                setMobileEdit(mobile)
                setMobile('')
                setKey(key+1)
                setStep(1)
                setCode('')
                resetValues()
            }}>???????????? ?????????? ????????????</button>}
            {step===3 && key && <>
                <div className={'alert alert-success'}>
                    ?????????? ?????????????? ?????????????????????: {freeTries}
                </div>
                <form className={'d-flex flex-wrap justify-content-center w-100'}>
                    {fields.length > 0 && <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">???????? ?????? ???? ???????????? ????????:</label>
                        <Select placeHolder={'???????????? ????????'} options={fields}
                                onChange={value => {
                                    setKeyEdit(keyEdit+1)
                                    selectFieldHandle(value)
                                }}/>
                    </div>}
                    {tendencies.length > 0 && <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">?????????? ?????? ???? ???????????? ????????:</label>
                        <Select placeHolder={'???????????? ??????????'} options={tendencies}
                                onChange={value => {
                                    setKeyEdit(keyEdit+1)
                                    setSelectedTendencies(value)
                                }}/>
                    </div>}
                </form>
                {courses.length > 0 && <div className={'d-flex flex-column align-items-center'}>
                    <div className={'table-responsive'}>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">?????? ??????</th>
                                <th scope="col">???????? (33.33- ???? 100)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {validations && courses.map((item, index) => {
                                return <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className={'has-validation'}>
                                            <InputNumber onchange={(v) => {
                                                setKeyEdit(keyEdit+1)
                                                textInputOnChange(v, index)
                                            }}
                                                         type={'float'}
                                                         className={`form-control w-100 banner ${validations[index] ? "is-invalid" : ""}`}/>
                                            <div className={'invalid-feedback p-2 bg-danger text-white rounded'}>
                                                ?????????? ???????? 33.33- ???? 100 ???????????????
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        <div className={'has-validation mx-5 mb-5 text-center bg-main rounded p-3'}>
                            <label htmlFor="select">???????? ?????? ???? ???????? ????????(???? ???? ???? ????):</label>
                            <InputNumber placeHolder={'????????: 14.5'} value={ave} type={'float'} onchange={(v) => {
                                setKeyEdit(keyEdit+1)
                                setAve(v)
                            }} className={`form-control ${aveValidation ? 'is-invalid' : ''}`}/>
                            <div className={'invalid-feedback p-2 bg-danger text-white rounded'}>
                                ?????????? ???????? 10 ???? 20 ???????????????
                            </div>
                        </div>
                    </div>
                    <button onClick={() => {
                        if(keyEdit > changeKey){
                            setChangeKey(keyEdit)
                            if (validationCourses()) {
                                if(freeTries >= 1) {
                                    setGetPrediction(true)
                                }else{
                                    cogoToast.error('???????? ???????? ?????????????? ???????????? ???????? ?????? ???????????????? ???? ?????????????? ????????????');
                                    setStep(4)
                                }
                            }
                        }else{
                            setShowModal(true)
                        }

                    }} className={'btn btn-primary mt-3'}> ????????
                        ????
                        ???? ???????? ??????
                    </button>
                </div>}
                <Modal show={showModal} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>?????????? ??????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <div className={'mt-3'}>
                             <ul>
                                 {
                                     predictions.map((item,index)=>{
                                         return <li key={index} className={'mt-2'}>?????????? ???????? ?????? ???? ?????????? <span className={'font-weight-bold'}> {item.name} </span>
                                             ???? <span className={'badge badge-success'}>{numberWithCommas(item.predictionDTOS[2].rank)}</span> ????
                                             <span className={'badge badge-warning mx-1'}>{numberWithCommas(item.predictionDTOS[0].rank)}</span>?????????? ??????.</li>
                                     })
                                 }

                             </ul>
                            </div>
                        <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                onClick={hideModal}>????????
                        </button>
                    </Modal.Body>
                </Modal>
            </>}
            {step===4&& <Payment userId={mobile} setLoading={setLoading} group={group} type={'radio'} pageType={group === 1 ? 'TAKHMIN_BEHDASHT':'TAKHMIN_OLOOM'}/>}
        </div>
    </div>
}
