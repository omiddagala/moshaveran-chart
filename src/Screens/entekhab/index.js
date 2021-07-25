import React, {useEffect, useState} from "react";
import StartWithoutCode from "./StartWithoutCode";
import StartWithCode from "./StartWithCode";
import FirstStep from "./FirstStep";
import Home from "./Home";
import {Route, Switch} from "react-router-dom";
import NotFound from "../NotFound";
import Store from "../../Storage/Store";
import SecondStep from "./SecondStep";

export default function Index({group}){
    const [updateFromStorage,setUpdateFromStorage] = useState(1)
    const [data,setData] = useState({
        code:'',
        mobile:'',
        field:null,
        group:null,
        benefit:null,
        ave:'',
        name:'',
        family:'',
        gender:'',
        ranks:[]
    })

    useEffect(()=>{
        Store.get('data-choice').then(d=>{
            console.log(d,'ddddss');
            if (d){
                setData(d.data)
            }
        })
    },[updateFromStorage])

    useEffect(()=>{
        console.log(data,'data');
    },[data])

   return <Switch>
       <Route path="/entekhab" exact><Home/></Route>
       <Route path="/entekhab/start-with-code" exact><StartWithCode/></Route>
       <Route path="/entekhab/start-without-code" exact><StartWithoutCode dispatch={{setData,setUpdateFromStorage}} state={{data,updateFromStorage}}/></Route>
       <Route path="/entekhab/first" exact><FirstStep dispatch={{setData}} state={{data}} group={group}/></Route>
       <Route path="/entekhab/second" exact><SecondStep dispatch={{setData}} state={{data}} group={group}/></Route>
       <Route path=""><NotFound/></Route>
   </Switch>
}
