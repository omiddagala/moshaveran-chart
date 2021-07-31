import React, {useEffect, useState} from "react";
import StartWithoutCode from "./StartWithoutCode";
import StartWithCode from "./StartWithCode";
import FirstStep from "./FirstStep";
import Home from "./Home";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import NotFound from "../NotFound";
import Store from "../../Storage/Store";
import SecondStep from "./SecondStep";
import CheckStep from "./CheckStep";
import Pay from "./Pay";
import SpinnerLoading from "../../Components/Spinner";
import Chance from "./Chance";
import Level from "./Level";

export default function Index({group}){
    const init = {
        code:'',
        mobile:'',
        fieldOfChoice: {id:null},
        group: {id:group},
        share: {id:null},
        ave:'',
        name:'',
        family:'',
        gender:'',
        ranks:[],
        levels:[]
    }
    const [updateFromStorage,setUpdateFromStorage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState(init)
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        Store.get('data-choice').then(d=>{
            if (d){
                setData(d.data)
            }
            switch (location.pathname){
                case '/entekhab/first':
                    if (!(d && d.data.code!=='')){
                        history.push('/entekhab/start-with-code')
                    }
                    break;
                case '/entekhab/second':
                    if (!(d && d.data.fieldOfChoice.id)){
                        history.push('/entekhab/start-with-code')
                    }
                    break;
                case '/entekhab/check':
                    if (!(d && d.data.name)){
                        history.push('/entekhab/start-with-code')
                    }
                    break;
            }
        })
    },[updateFromStorage])



   return <div>
       <SpinnerLoading
           show={loading}/>
       <Switch>
           <Route path="/entekhab" exact><Home/></Route>
           <Route path="/entekhab/start-with-code" exact><StartWithCode/></Route>
           <Route path="/entekhab/start-without-code" exact><StartWithoutCode dispatch={{setData,setUpdateFromStorage}} state={{data,updateFromStorage}} init={init}/></Route>
           <Route path="/entekhab/first" exact><FirstStep dispatch={{setData,setUpdateFromStorage}} state={{data}} group={group}/></Route>
           <Route path="/entekhab/second" exact><SecondStep dispatch={{setData}} state={{data}} group={group}/></Route>
           <Route path="/entekhab/check" exact><CheckStep dispatch={{setData}} state={{data}} group={group}/></Route>
           <Route path="/entekhab/pay" exact><Pay dispatch={{setData,setLoading}} state={{data}} group={group}/></Route>
           <Route path="/entekhab/chance" exact><Chance dispatch={{setData,setLoading}} state={{data}} group={group}/></Route>
           <Route path="/entekhab/level" exact><Level dispatch={{setData,setLoading}} state={{data}} group={group}/></Route>
           <Route path=""><NotFound/></Route>
       </Switch>
   </div>
}
