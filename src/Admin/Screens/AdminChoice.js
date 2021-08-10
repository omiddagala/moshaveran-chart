import React, {useEffect, useState} from "react";
import InputNumber from "../../Components/InputNumber";
import useApi from "../../useApi/useApi";
import {postProcessAdmin, preProcessAdmin} from "../../useApi/preProcesses/AdminProcessApi";
import InfiniteScroll from "react-infinite-scroll-component";
import {Modal} from "react-bootstrap";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import Select from "../../Components/Select";
import cogoToast from "cogo-toast";
import SpinnerLoading from "../../Components/Spinner";
export default function AdminChoice(){
    const [code,setCode] = useState(null)
    const [name,setName] = useState(null)
    const [family,setFamily] = useState(null)
    const [mobile,setMobile] = useState(null)
    const [page,setPage] = useState(0)
    const [choicePost,setChoicePost] = useState(true)
    const [choiceSinglePost,setChoiceSinglePost] = useState(false)
    const [selectedChoiceCode,setSelectedChoiceCode] = useState({code:null})
    const [choice,setChoice] = useState(null)
    const [choices,setChoices] = useState({list:[]})
    const [showModal,setShowModal] = useState(false)
    const [fields, setFields] = useState([])
    const [benefits, setBenefits] = useState([])
    const [zaribha,setZaribha] = useState([])
    const [updatePost,setUpdatePost] = useState(false)
    const [showMore,setShowMore] =useState(false)

    useEffect(()=>{
        setChoicePost(true)
    },[page])

    const [choiceData, choiceStatus] = useApi(
        preProcessAdmin('choices', {
            "code": code === ''?null:code,
            "name": name === ''?null:name,
            "family": family === ''?null:family,
            "mobile": mobile === ''?null:mobile,
            "pageableDTO": {
                "page": page,
                "size": 20,
                "sortBy": "id",
                "direction": "ASC"
            }
        }),
        postProcessAdmin, [choicePost,page],
        choicePost);

    const [fieldsData, fieldsStatus] = useApi(
        preProcessUser('fieldsChoice', {group: choice?.group.id}),
        postProcessUser, [choice?.group.id],
        choice!==null);

    const [benefitsData, benefitsStatus] = useApi(
        preProcessUser('shares', {}),
        postProcessUser, [],
        true);

    const [zaribhaData, zaribhaStatus] = useApi(
        preProcessUser('zaribha', {id:choice?.fieldOfChoice.id}),
        postProcessUser, [choice?.fieldOfChoice.id],
        choice !== null && choice.fieldOfChoice?.id);

    const [choiceSingleData, choiceSingleStatus] = useApi(
        preProcessAdmin('choiceSingle', {code:selectedChoiceCode.code}),
        postProcessAdmin, [choiceSinglePost],
        choiceSinglePost);

    const [updateData, updateStatus] = useApi(
        preProcessAdmin('second', choice),
        postProcessAdmin, [updatePost],
        updatePost);

    useEffect(() => {
        if (updateStatus === 'SUCCESS') {
            cogoToast.success('ویرایش با موفقیت انجام شد')
            setShowModal(false)
            setPage(0)
            setChoicePost(true)
        }
        setUpdatePost(false)
    }, [updateStatus])

    useEffect(() => {
        if (benefitsStatus === 'SUCCESS') {
            setBenefits(benefitsData.list)
        }
    }, [benefitsStatus])

    useEffect(() => {
        if (fieldsStatus === 'SUCCESS') {
            setFields(fieldsData.list)
        }
    }, [fieldsStatus])

    useEffect(()=>{
        if (choiceStatus==='SUCCESS'){
            setShowMore(choiceData.list.length === 20)
            let temp=[]
            if (page===0){
                temp = choiceData.list
            }else{
                temp = [...choices.list, ...choiceData.list]
            }
            setChoices({...choices,list:temp})
            setChoicePost(false)
        }
    },[choiceStatus])

    useEffect(()=>{
        if (choiceSingleStatus === 'SUCCESS'){
            setChoice({...choiceSingleData.list})
            setShowModal(true)
        }
        setChoiceSinglePost(false)
    },[choiceSingleStatus])

    useEffect(()=>{
        if (selectedChoiceCode.code !== null){
            setChoiceSinglePost(true)
        }
    },[selectedChoiceCode])

    function handleState(state){
        switch (state){
            case 'FIRST':
                return 'مرحله اول';
            case 'SECOND':
                return 'مرحله دوم';
            case 'PAID':
                return 'پرداخت شده';

        }
    }

    useEffect(()=>{
        if (zaribhaStatus==='SUCCESS'){
            if (choice?.ranks?.length === 0){
                let zaribs = zaribhaData.list.map((item)=>{
                    return {
                        code:item.code,
                        rotbeBaSahmie:choice.ranks.filter(r=>r.code === item.code)[0]?.rotbeBaSahmie ?? null,
                        rotbeBiSahmie:choice.ranks.filter(r=>r.code === item.code)[0]?.rotbeBiSahmie ?? null,
                        allowed:true,
                        choice:{id:choice.id},
                        tendencyOfChoice:{
                            id: item.id
                        }
                    }
                })
                setChoice({...choice,ranks:zaribs})
            }
            setZaribha(zaribhaData.list)
        }
    },[zaribhaStatus])

    return <div className={'container'}>
        <SpinnerLoading
            show={[choiceStatus, choiceSingleStatus, zaribhaStatus, fieldsStatus, benefitsStatus, updateStatus].includes('LOADING')}/>
        <form onSubmit={(e)=>{
            e.preventDefault()
            setChoices({list:[]})
            setPage(0)
            setChoicePost(true)
        }} className={'d-flex flex-lg-row flex-column mt-4 px-3 flex-wrap justify-content-center'} action="">
            <div className={'col-12 col-lg-3'}>
                <label htmlFor="">کد اختصاصی</label>
                <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} className={'form-control'}/>
            </div>
            <div className={'col-12 col-lg-3'}>
                <label htmlFor="">نام</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className={'form-control'}/>
            </div>
            <div className={'col-12 col-lg-3'}>
                <label htmlFor="">نام خانوادگی</label>
                <input value={family} onChange={(e)=>{setFamily(e.target.value)}} type="text" className={'form-control'}/>
            </div>
            <div className={'col-12 col-lg-3'}>
                <label htmlFor="">شماره موبایل</label>
                <InputNumber type="integer" value={mobile} onchange={(v)=>setMobile(v)} className={'form-control'}/>
            </div>
            <button className={'btn btn-primary mt-4'}>جستجو</button>
        </form>
        <div className={'table-responsive mt-5'} >
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th>کد اختصاصی</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>موبایل</th>
                        <th>وضعیت</th>
                        <th>ویرایش</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        choices.list.map((item,index)=>{
                            return <tr key={index}>
                                <td>
                                    {item.code}
                                </td>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.family}
                                </td>
                                <td>
                                    {item.mobile}
                                </td>
                                <td>
                                    {handleState(item.state)}
                                </td>
                                <td>
                                    <button className={'btn btn-primary'} onClick={()=>{
                                        setSelectedChoiceCode({...selectedChoiceCode,code:item.code})
                                    }}>ویرایش</button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                {
                    showMore &&  <button className={'btn btn-dark mb-5'} onClick={()=>setPage(page+1)}>بیشتر >></button>
                }
            </div>
        {
            choice !== null && <Modal size="lg" show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>ویرایش اطلاعات انتخاب رشته با کد {choice.code}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {fields.length > 0 && <div className={'mb-3'}>
                        <label htmlFor="">رشته امتحانی</label>
                        <Select placeHolder={'انتخاب رشته'} options={fields} value={choice.fieldOfChoice?.id}
                                onChange={value => {
                                    setChoice({...choice,fieldOfChoice: {id:parseInt(value)}})
                                }}/>
                    </div>}
                    {benefits.length > 0 && <div className={'mb-3'}>
                        <label htmlFor="">سهمیه:</label>
                        <Select placeHolder={'انتخاب سهمیه'} options={benefits} value={choice.share.id}
                                onChange={value => {
                                    setChoice({...choice,share: {id:parseInt(value)}})
                                }}/>
                    </div>}
                    <div className={'has-validation mb-3'}>
                        <label htmlFor="">
                            نام:
                        </label>
                        <input type="text" className={`form-control`} value={choice.name} onChange={(e)=>{
                            setChoice({...choice,name:e.target.value})
                        }}/>
                    </div>
                    <div className={'has-validation mb-3'}>
                        <label htmlFor="">
                            نام خانوادگی:
                        </label>
                        <input type="text" className={`form-control`} value={choice.family} onChange={(e)=>{
                            setChoice({...choice,family:e.target.value})}
                        }/>
                    </div>
                    <div className={'has-validation mb-3'}>
                        <label htmlFor="">
                            جنسیت:
                        </label>
                        <Select value={choice.gender} options={[{id:'MALE',name:'مرد'},{id:'FEMALE',name:'زن'}]} className={`form-control`} onChange={(v)=> {
                            setChoice({...choice, gender: v})
                        }}/>
                        <p className={'invalid-feedback'}>لطفا جنسیت را انتخاب نمایید.</p>
                    </div>
                    <div className={'table-responsive'}>
                        <table className={'w-100 table'}>
                            <thead>
                            <tr>
                                <th>کد ضریب</th>
                                <th>رتبه در سهمیه</th>
                                {
                                    choice.share.id === 2 && <th>رتبه بدون سهمیه</th>
                                }
                                <th>مجاز به انتخاب دوره‌های روزانه و نوبت دوم</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               choice.ranks && choice.ranks.map((item,index)=>{
                                    return <tr>
                                        <td>{item.code}</td>
                                        <td>
                                            <div className={'has-validation'}>
                                                <InputNumber value={item.rotbeBaSahmie} type={'integer'} onchange={value=> {
                                                    let temp = choice.ranks;
                                                    temp[index].rotbeBaSahmie = parseInt(value);
                                                    setChoice({...choice,ranks:temp})
                                                }} className={`form-control`} />
                                                <p className={'invalid-feedback'}>لطفا مقدار رتبه را صحیح وارد کنید</p>
                                            </div>

                                        </td>
                                        {
                                            choice.share.id === 2 && <td><InputNumber className={'form-control'} type="integer" value={item.rotbeBiSahmie} onchange={(v)=>{
                                                let temp = choice.ranks;
                                                temp[index].rotbeBiSahmie = parseInt(v);
                                                setChoice({...choice,ranks:temp})
                                            }}/></td>
                                        }
                                        <td>
                                            <input className={'form-control'} type="checkbox" checked={item.allowed} onChange={(e)=>{
                                                let temp = choice.ranks;
                                                temp[index].allowed = e.target.checked;
                                                setChoice({...choice,ranks:temp})
                                            }}/>
                                        </td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                        <button className={'btn btn-primary'} onClick={()=>{
                        setUpdatePost(true)}
                        }>ویرایش</button>
                    </div>
                </Modal.Body>
            </Modal>
        }

    </div>
}
