import React, {useEffect, useState} from "react";
import InputNumber from "../../Components/InputNumber";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {useHistory} from "react-router-dom";
import Store from "../../Storage/Store";
export default function Level({state,dispatch}){
    const [levels,setLevels]= useState([])
    const [levelsPost,setLevelsPost]= useState(false)
    const [loginPost,setLoginPost]= useState(false)

    const history = useHistory()
    const [loginData, loginStatus,statusCode] = useApi(
        preProcessUser('login', {code:state.data.code}),
        postProcessUser, [loginPost],
        loginPost);

    useEffect(()=>{
        if (state.data.state === 'FIRST'){
            history.push('/entekhab/start-with-code')
        }else if(state.data.state === 'SECOND'){
            setLoginPost(true)
        }
    },[])


    useEffect(()=>{
        if (loginStatus === 'SUCCESS'){
            dispatch.setData(loginData.list)
            Store.store('data-choice',{data:loginData.list}).then()
        }
    },[loginStatus])

    const [levelsGetData, levelsGetStatus] = useApi(
        preProcessUser('levelsChoiceGet', {code:state.data.code.toString()}),
        postProcessUser, [state.data.code],
        state.data.code !== '');

    const [levelsData, levelsStatus] = useApi(
        preProcessUser('levelsChoice', levels.map(item=>{
            return {
                level:item.level,
                choice:item.choice,
                tendency:item.tendency
            }
        })),
        postProcessUser, [levelsPost],
        levelsPost);

    useEffect(()=>{
        if(levelsStatus==='SUCCESS'){
            history.push('/entekhab/chance')
        }
        setLevelsPost(false)
    },[levelsStatus])

    useEffect(()=>{
        if(levelsGetStatus==='SUCCESS'){
            setLevels(state.data.ranks.map(item=>{
                return {level:levelsGetData.list.filter(c=>c.tendency === item.tendencyOfChoice.id)[0]?.level,
                    choice: {id:state.data.id},
                    code:item.code,
                    tendency:item.tendencyOfChoice.id}
            }))
        }
        setLevelsPost(false)
    },[levelsGetStatus])

    return <div className={'w-100 container'}>
        <div className={'input-box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h2 className={'text-center mb-5'}>نرم افزار انتخاب رشته ۱۴۰۰</h2>
            <h4 className={'text-center mb-5'}> (تراز‌ها)</h4>
            <div className={'table-responsive'}>
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
                                    temp[index].level = parseInt(v)
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
