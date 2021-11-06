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
    const [selectedFile,setSelectedFile] = useState({id:null})
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
        preProcessAdmin('resultList', {
            "page": page,
            "size": 200,
            "sortBy": "id",
            "direction": "ASC"
        }),
        postProcessAdmin, [choicePost,page],
        choicePost);

    useEffect(()=>{
        if (choiceStatus==='SUCCESS'){
            setShowMore(choiceData.list.length === 200)
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

    const [choiceSingleData, choiceSingleStatus] = useApi(
        preProcessAdmin('selectedFile', {id:selectedFile.id}),
        postProcessAdmin, [choiceSinglePost],
        choiceSinglePost);

    useEffect(()=>{
        if (selectedFile.id !== null){
            setChoiceSinglePost(true)
        }
    },[selectedFile])

    useEffect(()=>{
        if (choiceSingleStatus === 'SUCCESS'){
            setChoice(choiceSingleData.list)
            console.log(choice)
            setShowModal(true)
        }
        setChoiceSinglePost(false)
    },[choiceSingleStatus])

    return <div className={'container'}>
        <SpinnerLoading
            show={[choiceStatus, choiceSingleStatus].includes('LOADING')}/>
        <div className={'table-responsive mt-5'} >
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>گروه</th>
                        <th>نام</th>
                        <th>نام خانوادگی</th>
                        <th>مشاهده</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        choices.list.map((item,index)=>{
                            return <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {item.choice.group.name}
                                </td>
                                <td>
                                    {item.choice.name}
                                </td>
                                <td>
                                    {item.choice.family}
                                </td>
                                <td>
                                    <button className={'btn btn-primary'} onClick={()=>{
                                        setSelectedFile({id:item.id})
                                    }}>مشاهده</button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                {
                    showMore &&  <button className={'btn btn-dark mb-5'} onClick={()=>setPage(page+1)}>بیشتر {">"}{">"}</button>
                }
            </div>
        {
            choice !== null && <Modal size="xl" show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>تصویر کارنامه {choice.code}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={"data:image;base64," + choice} className={'w-100'} alt=""/>
                    <button className={'btn btn-info mt-3'} onClick={() => {
                        setShowModal(false)
                    }}>بستن
                    </button>
                </Modal.Body>
            </Modal>
        }

    </div>
}
