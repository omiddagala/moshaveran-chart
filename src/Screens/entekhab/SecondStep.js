import React, {useEffect, useState} from "react";
import Select from "../../Components/Select";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {useHistory} from "react-router-dom";
import InputNumber from "../../Components/InputNumber";
import Store from "../../Storage/Store";
import Header from "./Components/Header";
import heroImage from "../../assets/hero-img.png";
import {Modal} from "react-bootstrap";
import cogoToast from "cogo-toast";
import routes from "./routes";
import rotbehOloom from '../../assets/rotbehOloom.jpeg'
import rotbehBehdasht from '../../assets/rotbehBehdasht.jpeg'
export default function SecondStep({dispatch,state,getUrl,group}){
    const [zaribha,setZaribha] = useState([])
    const [secondPost,setSecondPost] = useState(false)
    const [invalid,setInvalid] = useState({name:false,family:false,gender:false,zaribha:[]})
    const [changeKey,setChangeKey] = useState(0)
    const [editKey,setEditKey] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const history = useHistory()
    const [zaribhaData, zaribhaStatus] = useApi(
        preProcessUser('zaribha', {id:state.data.fieldOfChoice.id}),
        postProcessUser, [state.data.fieldOfChoice],
        state.data.fieldOfChoice?.id);

    const [secondData, secondStatus] = useApi(
        preProcessUser('second', state.data),
        postProcessUser, [secondPost],
        secondPost);

    useEffect(()=>{
        if (zaribhaStatus==='SUCCESS'){
            setInvalid({
               ...invalid,zaribha: zaribhaData.list.map((item) => {
                    return false;
                })
            })
            if (state.data.ranks.length === 0){
                let zaribs = zaribhaData.list.map((item)=>{
                    return {
                        code:item.code,
                        rotbeBaSahmie:null,
                        rotbeBiSahmie:null,
                        allowed:true,
                        choice:{id:state.data.id},
                        tendencyOfChoice:{
                            id: item.id
                        }
                    }
                })
                dispatch.setData({...state.data,ranks:zaribs})
            }
            setZaribha(zaribhaData.list)
        }
    },[zaribhaStatus])

    useEffect(()=>{
        if (secondStatus==='SUCCESS'){
            Store.store('data-choice',{data: {...state.data,state:'SECOND'}}).then(d=> {
                    history.push(getUrl(routes.check))
                }
            )
        }
        setSecondPost(false)
    },[secondStatus])

    function validation(){
        let temp = invalid;
        temp.name = state.data.name===''
        temp.family = state.data.family===''
        temp.gender = state.data.gender === ''
        setInvalid({...temp})
        let flag = true;
        if (!(temp.name || temp.family || temp.gender)){
            console.log(state.data.share);
            if (state.data.share.id === 1){
                let t = state.data.ranks.filter(item=>item.rotbeBiSahmie)
                if (t.length === 0){
                    cogoToast.error('حداقل یک رتبه بدون سهمیه را وارد نمایید')
                    flag =false
                }
            }else{
                let t = state.data.ranks.filter(item=>item.rotbeBaSahmie)
                if (t.length === 0){
                    cogoToast.error('حداقل یک رتبه در سهمیه را وارد نمایید')
                    flag=false
                }
            }

            if (flag){
                if (editKey > changeKey){
                    setSecondPost(true)
                }else{
                    history.push(getUrl(routes.check))
                }
            }
        }else{
            cogoToast.error('لطفا موارد اجباری را تکمیل فرمایید')
        }
    }

    useEffect(()=>{
        dispatch.setLoading([zaribhaStatus,secondStatus].includes('LOADING'))
    },[zaribhaStatus,secondStatus])


    return <div className={'w-100 container'}>
        <Header code={state.data.code} getUrl={getUrl}/>
        <div className={'box p-lg-5 p-2 pt-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (مرحله دوم)</h4>
            <div className={'d-flex flex-column flex-lg-row justify-content-around w-100'}>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        نام:
                    </label>
                    <input type="text" className={`form-control ${invalid.name?'is-invalid':''}`} value={state.data.name} onChange={(e)=>{
                        setEditKey(editKey+1)
                        dispatch.setData({...state.data,name:e.target.value})
                    }}/>
                    <p className={'invalid-feedback'}>لطفا نام را وارد نمایید</p>
                </div>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        نام خانوادگی:
                    </label>
                    <input type="text" className={`form-control ${invalid.family?'is-invalid':''}`} value={state.data.family} onChange={(e)=>{
                        setEditKey(editKey+1)
                        dispatch.setData({...state.data,family:e.target.value})}
                    }/>
                    <p className={'invalid-feedback'}>لطفا نام خانوادگی را وارد نمایید</p>
                </div>
                <div className={'has-validation'}>
                    <label htmlFor="">
                        جنسیت:
                    </label>
                    <Select value={state.data.gender} options={[{id:'MALE',name:'مرد'},{id:'FEMALE',name:'زن'}]} className={`form-control ${invalid.gender?'is-invalid':''}`} onChange={(v)=> {
                        setEditKey(editKey+1)
                        dispatch.setData({...state.data, gender: v})
                    }}/>
                    <p className={'invalid-feedback'}>لطفا جنسیت را انتخاب نمایید.</p>
                </div>
            </div>
            <div className={'d-flex flex-column flex-lg-row align-items-center'}>
                <div className={'col-6'}>
                    <p className={' alert alert-info my-3'}>مهمترین فاکتور در انتخاب رشته سهمیه‌های آزاد، رتبه در سهمیه در ضریب‌های مختلف است.</p>
                </div>
                <div className={'col-6 w-100 d-flex justify-content-center my-3'}>
                    <div className={'box col-lg-8'}>
                        <img src={group ===1?rotbehBehdasht: rotbehOloom} className={'w-100'} alt=""/>
                        <button type={'button'} className={'btn btn-info'} onClick={()=>{
                            setShowModal(true)
                        }}>مشاهده راهنمای معدل کارنامه</button>
                    </div>
                </div>
            </div>

            <div className={'table-responsive'}>
                <table className={'w-100 table'}>
                    <thead>
                    <tr>
                        <th>کد ضریب</th>
                        <th>رتبه در سهمیه</th>
                        {
                            state.data.share.id === 1 && <th>رتبه بدون سهمیه</th>
                        }
                        <th>مجاز به انتخاب دوره‌های روزانه و نوبت دوم</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.data.ranks.map((item,index)=>{
                            return <tr>
                                <td>{item.code}</td>
                                <td>
                                    <div className={'has-validation'}>
                                        <InputNumber value={item.rotbeBaSahmie} type={'integer'} onchange={value=> {
                                            setEditKey(editKey+1)
                                            let temp = state.data.ranks;
                                            temp[index].rotbeBaSahmie = value;
                                            dispatch.setData({...state.data,ranks:temp})
                                        }} className={`form-control ${invalid.zaribha[index]?'is-invalid':''}`} />
                                        <p className={'invalid-feedback'}>لطفا مقدار رتبه را صحیح وارد کنید</p>
                                    </div>

                                </td>
                                {
                                    state.data.share.id === 1 && <td><InputNumber className={'form-control'} type="integer" value={item.rotbeBiSahmie} onchange={(v)=>{
                                        setEditKey(editKey+1)
                                        let temp = state.data.ranks;
                                        temp[index].rotbeBiSahmie = v;
                                        dispatch.setData({...state.data,ranks:temp})
                                    }}/></td>
                                }
                                <td>
                                    <input className={'form-control'} type="checkbox" checked={item.allowed} onChange={(e)=>{
                                        setEditKey(editKey+1)
                                        let temp = state.data.ranks;
                                        temp[index].allowed = e.target.checked;
                                        dispatch.setData({...state.data,ranks:temp})
                                    }}/>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

            </div>
            <div>
                <button className={'btn btn-primary mx-2'} onClick={()=> {
                        validation()
                }}>مرحله بعد</button>
                <button className={'btn btn-info mx-2'} onClick={()=>history.replace(getUrl(routes.first))}>مرحله قبل</button>
            </div>
        </div>
        <Modal  show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header>
                <Modal.Title>راهنمای رتبه در کارنامه</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'d-flex align-items-center flex-column'}>
                <img src={group ===1?rotbehBehdasht: rotbehOloom} className={'w-100'} alt=""/>
                <button className={'btn btn-info mt-3'} onClick={()=>{
                    setShowModal(false)}}>بستن</button>
            </Modal.Body>
        </Modal>
    </div>
}
