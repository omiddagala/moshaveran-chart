import React, {useEffect, useState} from 'react'
import useApi from "../useApi/useApi";
import SpinnerLoading from "../Components/Spinner";
import {postProcessUser, preProcessUser} from '../useApi/preProcesses/UserProcesseApi'
import {Modal} from "react-bootstrap";
import hero from '../assets/hero-img.png'
import Select from "../Components/Select";
import InputNumber from "../Components/InputNumber";

export default function Home() {
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

    const messagesEndRef = React.createRef()

    const [groupsData, groupsStatus] = useApi(
        preProcessUser('groups', {}),
        postProcessUser, [],
        true);

    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fields', {id: selectedGroup}),
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
        preProcessUser('prediction', {courses: courses, ave, field: selectedField?.id}),
        postProcessUser, [getPrediction],
        getPrediction);

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
        messagesEndRef.current.scrollIntoView({block: 'end', behavior: 'smooth'});
    }, [courses, fields, tendencies])

    function selectFieldHandle(value) {
        let filtered = fields.filter(item => {
            return item.id.toString() === value;
        })
        setSelectedField(filtered !== [] ? filtered[0] : null)
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

    return <div className={'bg-main'}>
        <SpinnerLoading
            show={[groupsStatus , fieldsStatus , tendenciesStatus , coursesStatus, predictionStatus].includes('LOADING')}/>
        <div className={'pb-4 d-flex flex-column container'} ref={messagesEndRef}>
            <div className="row align-items-center">
                <div className="pt-4 pt-lg-0  d-flex flex-column justify-content-center ">
                    <div className="px-4 text-center">
                        <img className="d-block mx-auto mb-2" src="/logo.svg" alt="" width="172"
                             height="157"/>
                        <h1 className="display-5 fw-bold mb-5">به شما می گوییم کجا قبول می شوید</h1>
                        <div className=" mx-auto">
                            <p className="lead mb-5">ما در نرم افزار انتخاب رشته برتر، کدرشته های
                                قبول شده و قبول نشده بیش از 109،000 کارنامه نهایی ارشد 99 را در دانشگاه های سراسری و
                                آزاد
                                تحلیل
                                کرده
                                ایم. </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'input-box d-flex flex-wrap align-item-center justify-content-center py-5'}>

                <div className="d-flex flex-column col-12 col-lg-6 align-items-center mt-3">
                    <form className={'d-flex flex-wrap justify-content-center w-100'}>
                        <div className={'mx-5 mb-5'}>
                            <label htmlFor="select">گروه خود را انتخاب کنید:</label>
                            <Select placeHolder={'انتخاب گروه'} options={groups}
                                    onChange={value => setSelectedGroup(value)}/>
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
                                <div className={'d-flex flex-lg-row flex-column justify-content-around '}>
                                    {predictions.map((item, index) => {
                                        if (item.level === 1) {
                                            return <div key={index} className={'col-12 col-lg-4 p-3'}>
                                                <div className={'rounded bg-success p-2'}>
                                                    <h6 className={'text-white m-0'}>حالت خوشبینانه</h6>
                                                    <h3 className={'mt-3 text-white'}>{item.rank}</h3>
                                                </div>
                                            </div>
                                        } else if (item.level === 2) {
                                            return <div key={index} className={'col-12 col-lg-4 p-3'}>
                                                <div className={'rounded bg-primary p-2'}>
                                                    <h6 className={'text-white m-0'}>حالت نرمال</h6>
                                                    <h3 className={'mt-3 text-white'}>{item.rank}</h3>
                                                </div>
                                            </div>
                                        } else if (item.level === 3) {
                                            return <div key={index} className={'col-12 col-lg-4 p-3'}>
                                                <div className={'rounded bg-warning p-2'}>
                                                    <h6 className={'text-white m-0'}>حالت بدبینانه</h6>
                                                    <h3 className={'mt-3 text-white'}>{item.rank}</h3>
                                                </div>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>}
                            <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                    onClick={hideModal}>بستن
                            </button>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="col-lg-6 col-12 d-none d-lg-flex">
                    <img src={hero} className="hero-img" alt=""/>
                </div>
            </div>
        </div>
    </div>
}
