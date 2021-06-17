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

export default function AdminChart() {
    const [data, setData] = useState([])
    const [groups, setGroups] = useState([])
    const [filterFieldList, setFilterFieldList] = useState([])
    const [fields, setFields] = useState([])
    const [getData, setGetData] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [selectedRow, setSelectedRow] = useState({id: null, level: null, rank: null})
    const [addActive, setAddActive] = useState(false)
    const [deleteActive, setDeleteActive] = useState(false)
    const [dataForChart, setDataForChart] = useState(null)
    const [filterGroup, setFilterGroup] = useState(null)
    const [filterField, setFilterField] = useState(null)
    const [validation, setValidation] = useState({level: false, rank: false})

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
                    label: 'تراز',
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
        preProcessAdmin('fields', {id: filterGroup}),
        postProcessAdmin, [filterGroup],
        filterGroup !== null);

    const [addData, addStatus] = useApi(
        preProcessAdmin('addAndEdit', {...selectedRow, field: {id: filterField}}),
        postProcessAdmin, [addActive],
        addActive);

    const [deleteData, deleteStatus] = useApi(
        preProcessAdmin('delete', {id: selectedRow.id}),
        postProcessAdmin, [deleteActive],
        deleteActive);

    const [chartData, chartStatus] = useApi(
        preProcessAdmin('ranks', {id: filterField}),
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
            cogoToast.error('عملیات افزودن با خطا مواجه شد');
        }
        setAddActive(false)
    }, [addStatus])

    useEffect(() => {
        if (deleteStatus === 'SUCCESS') {
            setGetData(true)
            hideModal()
        } else if (deleteStatus === 'ERROR') {
            cogoToast.error('عملیات حذف با خطا مواجه شد');
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
        if (filterFieldStatus === 'SUCCESS') {
            setFilterFieldList(filterFieldData.list)
        }
    }, [filterFieldStatus])

    useEffect(() => {
        if (filterField !== null) {
            setGetData(true)
        }
    }, [filterField])



    useEffect(() => {
        setGetData(true)
    }, [])

    useEffect(() => {
        if (chartStatus === 'SUCCESS') {
            setData(chartData.list)
        }
        setGetData(false)
    }, [chartStatus])

    useEffect(() => {
        setFilterFieldList([])
        setFilterField(null)
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

    return AdminRequireLoginMiddleware(<div>
        <SpinnerLoading
            show={[chartStatus, deleteStatus, addStatus, groupsStatus, filterFieldStatus].includes('LOADING')}/>
        <div className={'container pt-5'}>
            <div className={'d-flex justify-content-between'}>
                <div className={'col-6'}>
                    <button className={'btn btn-primary'} onClick={() => {
                        console.log(filterGroup, filterField);
                        if (filterField && filterGroup) {
                            setShowModal(true)
                        } else {
                            cogoToast.error('لطفا گروه و رشته را انتخاب نمایید');
                        }
                    }}>افزودن
                    </button>
                </div>
                <div className={'d-flex col-6'}>
                    <Select className={'mx-2'} placeHolder={'انتخاب گروه'} options={groups} value={filterGroup}
                            onChange={value => setFilterGroup(value)}/>
                    {filterFieldList.length > 0 &&
                    <Select placeHolder={'انتخاب رشته'} options={filterFieldList} value={filterField}
                            onChange={value => setFilterField(value)}/>}

                </div>
            </div>
            {data.length > 0 && <div>
                <div className={'mt-4 table-responsive  table-level-rank'}>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">تراز</th>
                            <th scope="col">رتبه</th>
                            <th scope="col">رتبه الگوریتم</th>
                            <th scope="col">گروه</th>
                            <th scope="col">رشته</th>
                            <th scope="col">عملیات</th>
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
                                                onClick={() => selectRowTableForEdit(index)}>ویرایش
                                        </button>
                                        <button className={'btn btn-danger'}
                                                onClick={() => selectRowTableForDelete(index)}>حذف
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
                        <Modal.Title>اطلاعات تراز و رتبه</Modal.Title>
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
                                <label htmlFor="">تراز</label>
                                <InputNumber type={'float'} className={`form-control ${validation.level ? 'is-invalid' : ''}`}
                                             value={selectedRow.level} onchange={(v) => {
                                    setSelectedRow({
                                        ...selectedRow,
                                        level: fixPersianNumbers(v)
                                    })
                                }}/>
                                <p className={'invalid-feedback'}>لطفا مقدار صحیح را وارد نمایید</p>
                            </div>
                            <div className={'has-validation'}>
                                <label htmlFor="" className={'mt-3'}>رتبه</label>
                                <InputNumber type={'float'} className={`form-control ${validation.rank ? 'is-invalid' : ''}`}
                                             value={selectedRow.rank} onchange={(v) => setSelectedRow({
                                    ...selectedRow,
                                    rank: fixPersianNumbers(v)
                                })}/>
                                <p className={'invalid-feedback'}>لطفا مقدار صحیح را وارد نمایید</p>
                            </div>
                            <button className={'btn btn-primary mt-3'}>{selectedRow.id ? 'ویرایش' : 'ثبت'}</button>
                            <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                    onClick={hideModal}>بستن
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={showModalDelete} onHide={hideModalDelete}>
                    <Modal.Header>
                        <Modal.Title>حذف تراز و رتبه</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>آیا از حذف سطر مورد نظر اطمینان دارید؟</p>
                        <button className={'btn btn-primary mt-3'} onClick={() => {
                            setDeleteActive(true)
                        }}>بلی
                        </button>
                        <button className={'btn btn-secondary mt-3 mx-2'} type={'button'}
                                onClick={hideModalDelete}>خیر
                        </button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
