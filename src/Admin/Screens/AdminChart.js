import React, {useEffect, useState} from 'react'
import AdminRequireLoginMiddleware from "../../AdminRequireLoginMiddleware";
import useApi from "../../useApi/useApi";
import {postProcessAdmin, preProcessAdmin} from "../../useApi/preProcesses/AdminProcessApi";
import SpinnerLoading from "../../Components/Spinner";
import {Modal} from "react-bootstrap";
import {Line} from 'react-chartjs-2';
import {fixPersianNumbers} from '../../HelperFunction'
import Select from "../../Components/Select";
import cogoToast from 'cogo-toast';
import InputNumber from "../../Components/InputNumber";
import { CSVLink } from "react-csv";
import {postProcessUser, preProcessUser} from "../../useApi/preProcesses/UserProcesseApi";

export default function AdminChart() {
    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [filterFieldList, setFilterFieldList] = useState([])
    const [filterTendencyList, setFilterTendencyList] = useState([])
    const [getData, setGetData] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [selectedRow, setSelectedRow] = useState({id: null, level: null, rank: null})
    const [addActive, setAddActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [dataForChart, setDataForChart] = useState(null)
    const [filterGroup, setFilterGroup] = useState('')
    const [filterField, setFilterField] = useState('')
    const [filterTendency, setFilterTendency] = useState('')
    const [validation, setValidation] = useState({level: false, rank: false})
    const [typeFile, setTypeFile] = useState(null)
    const [uploadActive, setUploadActive] = useState(false)
    const [file, setFile] = useState(null)

    useEffect(() => {
        let labels = data.map(function (item) {
            return item.level
        })
        let dataX = data.map(function (item) {
            return item.algoRank
        })
        setDataForChart({
            labels: labels,
            datasets: [
                {
                    label: '????????',
                    data: dataX,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    cubicInterpolationMode: 'monotone',
                },
            ],
        })
    }, [data])

    const [groupsData, groupsStatus] = useApi(
        preProcessAdmin('groups', {}),
        postProcessAdmin, [],
        true);

    const [filterFieldData, filterFieldStatus] = useApi(
        preProcessUser('fields', {id: filterGroup}),
        postProcessUser, [filterGroup],
        filterGroup);

    const [filterTendencyData, filterTendencyStatus] = useApi(
        preProcessUser('tendencies', {id: filterField}),
        postProcessUser, [filterField],
        filterField && filterGroup === "2");


    function dataForAdd(){
        let data = {...selectedRow, field: {id: filterField},subtendancy:null};
        if(filterGroup==='2'){
            data = {...data,subtendancy:{id:filterTendency}}
        }
        return data;
    }

    const [addData, addStatus] = useApi(
        preProcessAdmin('addAndEdit', dataForAdd()),
        postProcessAdmin, [addActive],
        addActive);

    function dataForChartAndDelete(){
        let data = {field: {id: filterField},subtendancy:null};
        if(filterGroup==='2'){
            data = {...data,subtendancy:{id:filterTendency}}
        }
        return data;
    }

    const [deleteData, deleteStatus] = useApi(
        preProcessAdmin('delete', dataForChartAndDelete()),
        postProcessAdmin, [deleteActive],
        deleteActive);


    const [chartData, chartStatus] = useApi(
        preProcessAdmin('ranks', dataForChartAndDelete()),
        postProcessAdmin, [getData],
        getData);

    useEffect(() => {
        if (groupsStatus === 'SUCCESS') {
            setGroups(groupsData.list)
        }
    }, [groupsStatus])

    useEffect(() => {
        if (addStatus === 'SUCCESS') {
            setGetData(true)
            hideModal()
        } else if (addStatus === 'ERROR') {
            cogoToast.error('???????????? ???????????? ???? ?????? ?????????? ????');
        }
        setAddActive(false)
    }, [addStatus])

    useEffect(() => {
        if (deleteStatus === 'SUCCESS') {
            setGetData(true)
            hideModal()
        } else if (deleteStatus === 'ERROR') {
            cogoToast.error('???????????? ?????? ???? ?????? ?????????? ????');
        }
        setDeleteActive(false)
        setShowModalDelete(false)
    }, [deleteStatus])


    useEffect(() => {
        if (groupsStatus === 'SUCCESS') {
            setGroups(groupsData.list)
        }
    }, [groupsStatus])


    useEffect(() => {
        if (filterFieldStatus === 'SUCCESS') {
            setFilterFieldList(filterFieldData.list)
        }
    }, [filterFieldStatus])

    useEffect(() => {
        if (filterTendencyStatus === 'SUCCESS') {
            setFilterTendencyList(filterTendencyData.list)
        }
    }, [filterTendencyStatus])

    useEffect(() => {
        if (filterGroup ==='1' && filterField){
            setGetData(true)
        }
    }, [filterField])

    useEffect(() => {
        if (filterTendency){
            setGetData(true)
        }
    }, [filterTendency])

    useEffect(() => {
        if (chartStatus === 'SUCCESS') {
            setData(chartData.list)
        }
        setGetData(false)
    }, [chartStatus])

    useEffect(() => {
        setFilterFieldList([])
        setFilterTendencyList([])
        setFilterField(null)
        setFilterTendency(null)
        setData([])
    }, [filterGroup])

    function hideModal() {
        setShowModal(false)
        setSelectedRow({id: null, level: null, rank: null})
    }

    function hideModalDelete() {
        setSelectedRow({id: null, level: null, rank: null})
        setShowModalDelete(false)
    }

    function selectRowTableForEdit(index) {
        let temp = data[index]
        setSelectedRow({
            id: temp.id,
            level: temp.level,
            rank: temp.rank,
        })
        setShowModal(true)
    }

    function selectRowTableForDelete(index) {
        setSelectedRow(data[index])
        setShowModalDelete(true)
    }

    const optionsForChart = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    function dataForUpload(condition) {
        let formData = new FormData();
        if (condition) {
            formData.append('file', file)
            formData.append('fieldId', filterField);
            formData.append('type', typeFile);
            if (filterGroup === '2'){
                formData.append('subtendancyId', filterTendency);
            }
        }
        return formData;
    }

    const [uploadData, uploadStatus] = useApi(
        preProcessAdmin('upload', dataForUpload(uploadActive && typeFile)),
        postProcessAdmin, [uploadActive],
        uploadActive && typeFile);

    useEffect(() => {
        if (uploadStatus === 'SUCCESS') {
            cogoToast.success('???????????? ?????????? ???? ???????????? ?????????? ????');
            setTypeFile(null)
            setUploadActive(false)
            setGetData(true)
        } else if (uploadStatus === 'ERROR') {
            cogoToast.error('???????????? ?????????? ???? ?????? ?????????? ????');
        }
    }, [uploadStatus])

    useEffect(() => {
        if (typeFile !== null) {
            setUploadActive(true)
        }
    }, [typeFile])

    const csvData = data.map((item, index) => {
        return {level: item.level, rank: item.rank, field: item.field.name, group: item.field.group.name}
        });

    const headers = [
        { label: "level", key: "level" },
        { label: "rank", key: "rank" },
        { label: "field", key: "field" },
        { label: "group", key: "group" }
    ];

    return AdminRequireLoginMiddleware(<div>
        <SpinnerLoading
            show={[chartStatus, deleteStatus, addStatus, groupsStatus, filterFieldStatus, uploadStatus,filterTendencyStatus].includes('LOADING')}/>
        <div className={'container pt-5'}>
            <div className={'d-flex justify-content-between'}>

                <div className={'card d-flex flex-column align-items-center justify-content-center col-12 col-lg-3 py-2'}>
                    <button className={'btn btn-primary w-100'} onClick={() => {
                        if ((filterGroup === '1' && filterField) || (filterGroup === '2' && filterField && filterTendency)) {
                            setShowModal(true)
                        }
                        else {
                            cogoToast.error('???????? ???????? ?? ???????? (?? ??????????) ???? ???????????? ????????????');
                        }
                    }}>????????????
                    </button>
                    {((filterGroup === '1' && filterField) || (filterGroup === '2' && filterField && filterTendency) )&& <div className={'mt-3'}>
                        <label htmlFor="">???????? ????????</label>
                        <input onChange={(event) => {
                        setFile(event.target.files[0])
                        }} className={'form-control'} type="file"/>
                        {file &&
                        <button type={'button'} className={'btn btn-primary align-self-end mt-2 w-100'}
                            onClick={() => {
                                setTypeFile('LEVEL_RANK')
                            }}>?????????? ???????? ????????
                        </button>}
                    </div>}
                </div>
                <div className={'card d-flex flex-column align-items-center col-12 col-lg-4 py-2'}>

                    <Select className={'mb-2'} placeHolder={'???????????? ????????'} options={groups} value={filterGroup}
                            onChange={value => setFilterGroup(value)}/>
                    {filterFieldList.length > 0 &&
                    <Select className={'mb-2'} placeHolder={'???????????? ????????'} options={filterFieldList}
                            onChange={value => setFilterField(value)}/>}
                    {filterTendencyList.length > 0 && <Select className={'mb-2'} placeHolder={'???????????? ??????????'} options={filterTendencyList} value={filterTendency}
                                                             onChange={value => setFilterTendency(value)}/>
                    }
                    {data.length > 0 &&
                        <CSVLink filename={"level-rank.csv"}
                                 className={'btn btn-primary align-self-end mt-2 w-100'}
                                 data={csvData} headers={headers}>???????????? ????????</CSVLink>
                    }
                </div>
            </div>
            {data.length > 0 && <div>
                <div className={'mt-4 table-responsive  table-level-rank'}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">????????</th>
                            <th scope="col">????????</th>
                            <th scope="col">???????? ????????????????</th>
                            <th scope="col">????????</th>
                            <th scope="col">????????</th>
                            <th scope="col">????????????</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item, index) => {
                            return <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.level}</td>
                                <td>{item.rank}</td>
                                <td>{item.algoRank}</td>
                                <td>{item.field?.group?.name}</td>
                                    <td>{item.field?.name}</td>
                                    <td>
                                        <button className={'btn btn-primary mx-2'}
                                                onClick={() => selectRowTableForEdit(index)}>????????????
                                        </button>
                                        <button className={'btn btn-danger'}
                                                onClick={() => selectRowTableForDelete(index)}>??????
                                        </button>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                    {dataForChart && <Line data={dataForChart} options={optionsForChart}/>}
                </div>}
                <Modal show={showModal} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>?????????????? ???????? ?? ????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            let level, rank, group, field = false
                            if (!selectedRow.level) {
                                level = true
                            }
                            if (!selectedRow.rank) {
                                rank = true
                            }
                            if (!(level || rank)) {
                                setAddActive(true)
                            }
                            setValidation({level, rank})
                        }}>
                            <div className={'has-validation'}>
                                <label htmlFor="">????????</label>
                                <InputNumber type={'float'} className={`form-control ${validation.level ? 'is-invalid' : ''}`}
                                             value={selectedRow.level} onchange={(v) => {
                                    setSelectedRow({
                                        ...selectedRow,
                                        level: fixPersianNumbers(v)
                                    })
                                }}/>
                                <p className={'invalid-feedback'}>???????? ?????????? ???????? ???? ???????? ????????????</p>
                            </div>
                            <div className={'has-validation'}>
                                <label htmlFor="" className={'mt-3'}>????????</label>
                                <InputNumber type={'float'} className={`form-control ${validation.rank ? 'is-invalid' : ''}`}
                                             value={selectedRow.rank} onchange={(v) => setSelectedRow({
                                    ...selectedRow,
                                    rank: fixPersianNumbers(v)
                                })}/>
                                <p className={'invalid-feedback'}>???????? ?????????? ???????? ???? ???????? ????????????</p>
                            </div>
                            <button className={'btn btn-primary mt-3'}>{selectedRow.id ? '????????????' : '??????'}</button>
                            <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                    onClick={hideModal}>????????
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={showModalDelete} onHide={hideModalDelete}>
                    <Modal.Header>
                        <Modal.Title>?????? ???????? ?? ????????</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>?????? ???? ?????? ?????? ???????? ?????? ?????????????? ????????????</p>
                        <button className={'btn btn-primary mt-3'} onClick={() => {
                            setDeleteActive(true)
                        }}>??????
                        </button>
                        <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                onClick={hideModalDelete}>??????
                        </button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
