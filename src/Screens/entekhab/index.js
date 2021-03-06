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
import Priority from "./Priority";
import routes from "./routes";
import ScrollToTop from "../../Components/ScrollToTop";
import useApi from "../../useApi/useApi";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";
import Lock from "../Lock";

export default function Index({group, url,year}) {
    const init = {
        code: '',
        mobile: '',
        fieldOfChoice: {id: null},
        group: {id: group},
        share: {id: null},
        ave: null,
        name: '',
        family: '',
        gender: '',
        ranks: [],
        levels: []
    }
    const [updateFromStorage, setUpdateFromStorage] = useState(1)
    const [selectedChance, setSelectedChance] = useState([])
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(init)
    const location = useLocation();
    const history = useHistory();

    function getUrl(route) {
        return url + route
    }

    const [lockData, lockStatus] = useApi(
        preProcessUser('locked', {code: group}),
        undefined, [true],
        true);

        useEffect(()=>{
            setLoading(false)
            if (lockStatus === 'SUCCESS'){
                if (lockData === true)
                    history.replace(getUrl(routes.lock))
            }
        },[lockStatus])

    useEffect(() => {
        Store.get('data-choice').then(d => {
            if (d) {
                setData(d.data)
            }
            switch (location.pathname) {
                case getUrl(routes.first):
                    if (!(d && d.data.code !== '' && d.data.state !== 'PAID')) {
                        history.push(getUrl(routes.home))
                    }
                    break;
                case getUrl(routes.second):
                    if (!(d && d.data.fieldOfChoice.id && d.data.state !== 'PAID')) {
                        history.push(getUrl(routes.home))
                    }
                    break;
                case getUrl(routes.check):
                    if (!(d && d.data.name && d.data.state !== 'PAID')) {
                        history.push(getUrl(routes.home))
                    }
                    break;
                case getUrl(routes.pay):
                    if (!(d && d.data.name && d.data.state !== 'PAID' && d.data.state !== 'FIRST')) {
                        history.push(getUrl(routes.home))
                    }
                    break;
                case getUrl(routes.chance):
                case getUrl(routes.priority):
                    if (!(d && d.data.state === 'PAID')) {
                        history.push(getUrl(routes.home))
                    }
                    break;
            }
        })
    }, [updateFromStorage])


    return <div>
        <SpinnerLoading
            show={loading}/>
        <ScrollToTop/>
        <Switch>
            <Route path={getUrl(routes.home)} exact><Home getUrl={getUrl} group={group} year={year}/></Route>
            <Route path={getUrl(routes.startWithCode)} exact><StartWithCode dispatch={{setData, setLoading}}
                                                                            state={{data}} getUrl={getUrl}
                                                                            group={group} year={year}/></Route>
            <Route path={getUrl(routes.startWithoutCode)} exact year={year}><StartWithoutCode
                dispatch={{setData, setUpdateFromStorage, setLoading}} getUrl={getUrl} state={{data, updateFromStorage}}
                init={init} groupt={group} year={year}/></Route>
            <Route path={getUrl(routes.first)} exact><FirstStep dispatch={{setData, setUpdateFromStorage, setLoading}}
                                                                state={{data}} getUrl={getUrl} group={group} year={year}/></Route>
            <Route path={getUrl(routes.second)} exact><SecondStep dispatch={{setData, setLoading}} state={{data}}
                                                                  getUrl={getUrl} group={group} year={year}/></Route>
            <Route path={getUrl(routes.check)} exact><CheckStep dispatch={{setData, setLoading}} state={{data}}
                                                                getUrl={getUrl} group={group} year={year}/></Route>
            <Route path={getUrl(routes.pay)} exact><Pay dispatch={{setData, setLoading}} state={{data}} getUrl={getUrl}
                                                        group={group} year={year}/></Route>
            <Route path={getUrl(routes.chance)} exact><Chance dispatch={{setData, setLoading, setSelectedChance}}
                                                              getUrl={getUrl} state={{data, selectedChance}}
                                                              group={group} year={year}/></Route>
            <Route path={getUrl(routes.level)} exact><Level dispatch={{setData, setLoading}} state={{data}}
                                                            getUrl={getUrl} group={group} year={year}/></Route>
            <Route path={getUrl(routes.priority)} exact><Priority dispatch={{setData, setLoading}} getUrl={getUrl}
                                                                  state={{data, selectedChance}} group={group} year={year}/></Route>
            <Route path={getUrl(routes.lock)}><Lock/></Route>
            <Route path=""><NotFound/></Route>
        </Switch>
    </div>
}
