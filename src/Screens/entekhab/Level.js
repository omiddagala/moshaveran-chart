import React, {useEffect, useState} from "react";
import InputNumber from "../../Components/InputNumber";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import {useHistory} from "react-router-dom";
import Store from "../../Storage/Store";
import Header from "./Components/Header";
import routes from "./routes";
import aveBehdasht from "../../assets/aveBehdasht.jpeg";
import aveOloom from "../../assets/aveOloom.jpeg";
import {Modal} from "react-bootstrap";
import Info from "./Components/Info";
export default function Level({state,dispatch,getUrl,group,year}){
    const [levels,setLevels]= useState([])
    const [levelsPost,setLevelsPost]= useState(false)
    const [loginPost,setLoginPost]= useState(false)
    const [showModal, setShowModal] = useState(false)

    const history = useHistory()
    const [loginData, loginStatus,statusCode] = useApi(
        preProcessUser('login', {code:state.data.code}),
        postProcessUser, [loginPost],
        loginPost);

    useEffect(()=>{
        if (state.data.state === 'FIRST'){
            history.push(getUrl(routes.home))
        }else if(['SECOND','PAID'].includes(state.data.state)){
            setLoginPost(true)
        }
    },[state.data])


    useEffect(()=>{
        if (loginStatus === 'SUCCESS'){
            if (loginData.list.state!=='PAID'){
                history.push(getUrl(routes.pay))
            }else{
                dispatch.setData(loginData.list)
                Store.store('data-choice',{data:loginData.list}).then()
            }
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
            history.push(getUrl(routes.chance))
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

    function getCode(item){
        let temp = state.data.ranks.filter(r=>r.tendencyOfChoice.id===item.tendency)
        return group === 1 ? temp[0].tendencyOfChoice.name : temp[0].tendencyOfChoice.code
    }

    useEffect(()=>{
        dispatch.setLoading([levelsStatus,levelsGetStatus,loginStatus].includes('LOADING'))
    },[levelsStatus,loginStatus,levelsGetStatus])

    return <div className={'w-100 container'}>
        <Header code={state.data.code} getUrl={getUrl} group={group} year={year}/>
        <div className={'box p-lg-5 pt-5 p-2 mb-3 w-100 d-flex flex-column align-items-center'}>
            <h4 className={'text-center mb-5'}>ترازها (اختیاری)</h4>
            {/*<Info text={'راهنمای تستی'}/>*/}
            <div className={'table-responsive'}>
                <table className={'table'}>
                    <thead>
                    <tr>
                        <th>{group === 1 ? 'گرایش' : 'کد ضریب'}</th>
                        <th>نمره کل</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        levels.map((item,index)=>{
                            return <tr>
                                <td>{item.code??getCode(item)}</td>
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
                <div className={'w-100 d-flex justify-content-center my-3'}>
                    <div className={'box col-lg-5'}>
                        <img src={group ===1 ? aveBehdasht:aveOloom} className={'w-100'} alt=""/>
                        <button type={'button'} className={'btn btn-info'} onClick={()=>{
                            setShowModal(true)
                        }}>مشاهده راهنمای تراز کارنامه</button>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={()=>{
                    setLevelsPost(true)
                }} className={'btn btn-primary'}>مشاهده شانس قبولی</button>
            </div>
        </div>
        <Modal  show={showModal} onHide={()=>setShowModal(false)}>
            <Modal.Header>
                <Modal.Title>راهنمای تراز در کارنامه</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'d-flex align-items-center flex-column'}>
                <img src={group ===1 ? aveBehdasht:aveOloom} className={'w-100'} alt=""/>
                <button className={'btn btn-info mt-3'} onClick={()=>{
                    setShowModal(false)}}>بستن</button>
            </Modal.Body>
        </Modal>
    </div>
}
