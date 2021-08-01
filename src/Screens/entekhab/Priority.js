import React, {useEffect, useState} from "react";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {periodsLabel,chanceLabel} from  '../../HelperFunction'
import html2pdf from 'html2pdf.js'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {postProcessAdmin, preProcessAdmin} from "../../useApi/preProcesses/AdminProcessApi";
import cogoToast from "cogo-toast";

export default function Priority({state,dispatch}){
    const [sorted,setSorted] = useState([])
    const [file,setFile] = useState(null)
    const [uploadPost,setUploadPost] = useState(false)
    const [priorityData, priorityStatus] = useApi(
        preProcessUser('priority', state.selectedChance.map(item=>item.nId)),
        postProcessUser, [],
        true);

    useEffect(()=>{
        if(priorityStatus === 'SUCCESS'){
            setSorted(priorityData.list)
        }
    },[priorityStatus])

    function dataForUpload(condition) {
        if (condition){
            let formData = new FormData();
            formData.append('file', file)
            formData.append('cId', state.data.id);
            return formData;
        }
    }


    const [uploadData, uploadStatus] = useApi(
        preProcessUser('uploadResult', dataForUpload(uploadPost)),
        preProcessUser, [uploadPost],
        uploadPost);

    useEffect(()=>{
        if (uploadStatus==='SUCCESS'){
            cogoToast.success('آپلود با موفقیت انجام شد')
        }
        setUploadPost(false)
    },[uploadStatus])

    function trTable(item){
        let chance = state.selectedChance.filter(a=>a.nId === item)
        if (chance.length >0){
            chance = chance[0]
            return <tr>
                <td>
                    <p className={'text-'+chanceLabel(chance.label)[1]}>{chanceLabel(chance.label)[0]}</p>
                </td>
                <td>
                    <p>{chance.tendencyName}-{chance.subtendencyName}</p>
                </td>
                <td>
                    <p>{chance.universityName}-{periodsLabel(chance.uniTypeName)}</p>
                </td>
            </tr>
        }
    }

    return <div className={'w-100 container'}>
        <div className={'input-box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (اولویت‌بندی)</h4>
            <div className={'w-100'}>
                <div className={'table-responsive'} >
                    <table className={'table'} id={'pdf'}>
                        <thead>
                        <tr>
                            <th>شانس قبولی</th>
                            <th>رشته/گرایش</th>
                            <th>دانشگاه/دوره</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sorted.map((item)=>{
                                return trTable(item)
                            })
                        }
                        </tbody>
                    </table>
                    <div className={'d-flex flex-lg-row flex-column justify-content-between'}>
                        <div className={'d-flex'}>
                            <button className={'btn btn-primary mx-2'} onClick={()=>{
                                let body = document.body
                                let html = document.documentElement
                                let height = Math.max(body.scrollHeight, body.offsetHeight,
                                    html.clientHeight, html.scrollHeight, html.offsetHeight)
                                let element = document.querySelector('#pdf')
                                let heightCM = height / 35.35
                                html2pdf(element,{
                                    margin: 1,
                                    filename: 'result.pdf',
                                    html2canvas: { dpi: 192, letterRendering: true },
                                    jsPDF: {
                                        orientation: 'portrait',
                                        unit: 'cm',
                                    }
                                });
                            }}>دانلود pdf</button>
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-primary"
                                table="pdf"
                                filename="tablexls"
                                sheet="tablexls"
                                buttonText="دانلود excel"/>
                        </div>
                        <div className={'d-flex border rounded align-items-center my-5 my-lg-0'}>
                            <input type="file" accept="image/jpeg"  onChange={(event) => {
                                setFile(event.target.files[0])
                            }}/>
                            <button className={'btn btn-success'} onClick={()=>{
                                if (file){
                                    setUploadPost(true)
                                }else{
                                    cogoToast.error('لطفا فایل تصویر کارنامه را انتخاب نمایید')
                                }
                            }}>ارسال</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
}
