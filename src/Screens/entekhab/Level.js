import React, {useEffect, useState} from "react";
import InputNumber from "../../Components/InputNumber";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {useHistory} from "react-router-dom";
export default function Level({state,dispatch}){
    const [levels,setLevels]= useState([])
    const [levelsPost,setLevelsPost]= useState(false)
    const history = useHistory()
    useEffect(()=>{
        setLevels(state.data.ranks.map(item=>{
            return {level:null,choice: {id:state.data.id},code:item.code}
        }))
    },[state.data.ranks])

    const [levelsData, levelsStatus] = useApi(
        preProcessUser('levelsChoice', levels),
        postProcessUser, [levelsPost],
        levelsPost);

    useEffect(()=>{
        if(levelsStatus==='SUCCESS'){
            history.push('/entekhab/chance')
        }
        setLevelsPost(false)
    },[levelsStatus])

    return <div className={'w-100 container'}>
        <div className={'input-box p-5 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (تراز‌ها)</h4>
            <div className={'d-flex justify-content-around w-100'}>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th>کد ضریب</th>
                        <th>نمره کل</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        levels.map((item,index)=>{
                            return <tr>
                                <td>{item.code}</td>
                                <td><InputNumber type="integer" value={levels[index].level} onchange={(v)=>{
                                    let temp = levels;
                                    temp[index].level = v
                                    setLevels([...temp])
                                }} className={'form-control'}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={()=>{
                    setLevelsPost(true)
                }} className={'btn btn-primary'}>مشاهده شانس قبولی</button>
            </div>
        </div>
    </div>
}
