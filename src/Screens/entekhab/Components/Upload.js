import React, {useEffect, useState} from "react";
import cogoToast from "cogo-toast";
import useApi from "../../../useApi/useApi";
import {preProcessUser} from "../../../useApi/preProcesses/UserProcesseApi";
import Info from "./Info";
export default function Upload({dispatch, choiceId}){
    const [file,setFile] = useState(null)
    const [uploadPost,setUploadPost] = useState(false)
    function dataForUpload(condition) {
        if (condition){
            let formData = new FormData();
            formData.append('file', file)
            formData.append('cId', choiceId);
            return formData;
        }
    }


    const [uploadData, uploadStatus] = useApi(
        preProcessUser('uploadResult', dataForUpload(uploadPost)),
        preProcessUser, [uploadPost],
        uploadPost);

    useEffect(()=>{
        if (uploadStatus==='SUCCESS'){
            cogoToast.success('آپلود با موفقیت انجام شد',{
                hideAfter:10
            })
        }
        setUploadPost(false)
    },[uploadStatus])

    useEffect(()=>{
        dispatch.setLoading([uploadStatus].includes('LOADING'))
    },[uploadStatus])

    return <div className={'d-flex flex-column align-items-center'}>
        <Info text={'اختیاری: جهت پشتیبانی بهتر در مراحل انتخاب رشته، فایل چاپی، یا تصویر و یا صفحه اینترنتی ذخیره شده آن را در این قسمت بارگزاری کنید.'}/>
        <div className={'d-flex flex-lg-row flex-column rounded align-items-center my-5 my-lg-0 align-items-center'}>
            <label className={'mx-3 mb-0'} htmlFor="">
                آپلود فایل کارنامه:
            </label>
            <input type="file" accept="image/jpeg"  onChange={(event) => {
                setFile(event.target.files[0])
            }}/>
            <button className={'btn btn-success'} onClick={()=>{
                if (file){
                    setUploadPost(true)
                }else{
                    cogoToast.error('لطفا فایل تصویر کارنامه را انتخاب نمایید',{
                        hideAfter:10
                    })
                }
            }}>ارسال</button>
        </div>
    </div>
}