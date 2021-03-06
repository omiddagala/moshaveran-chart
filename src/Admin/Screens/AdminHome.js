import React, {useEffect, useState} from 'react'
import AdminRequireLoginMiddleware from "../../AdminRequireLoginMiddleware";
import useApi from "../../useApi/useApi";
import {preProcessAdmin, postProcessAdmin} from "../../useApi/preProcesses/AdminProcessApi";
import SpinnerLoading from "../../Components/Spinner";
import cogoToast from 'cogo-toast';
export default function AdminHome() {
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const [fieldFile, setFieldFile] = useState(null)
    const [tendencyFile, setTendencyFile] = useState(null)
    const [courseFile, setCourseFile] = useState(null)
    const [rotbeZaribFile, setRotbeZaribFile] = useState(null)
    const [notebookFile, setNotebookFile] = useState(null)
    const [priorityFile, setPriorityFile] = useState(null)
    const [typeFile, setTypeFile] = useState(null)
    const [uploadActive, setUploadActive] = useState(false)

    const [groupsData, groupsStatus] = useApi(
        preProcessAdmin('groups', {}),
        postProcessAdmin, [],
        true);


    function dataForUpload(condition) {
        let formData = new FormData();
        if (condition) {
            let file = null
            switch (typeFile) {
                case 'FIELD':
                    file = fieldFile
                    break;
                case 'SUBTENDANCY':
                    file = tendencyFile
                    break
                case 'COURSE':
                    file = courseFile;
                    break
                case 'ROTBE_ZARIB':
                    file = rotbeZaribFile;
                    break
                case 'NOTEBOOK':
                    file = notebookFile;
                    break
                case 'PRIORITY':
                    file = priorityFile;
                    break
            }
            formData.append('file', file)
            formData.append('groupId', selectedGroup);
            formData.append('type', typeFile);
        }
        return formData;
    }

    const [uploadData, uploadStatus] = useApi(
        preProcessAdmin('upload', dataForUpload(uploadActive && typeFile)),
        postProcessAdmin, [uploadActive],
        uploadActive && typeFile);

    useEffect(() => {
        if (groupsStatus === 'SUCCESS') {
            setGroups(groupsData.list)
        }
    }, [groupsStatus])

    useEffect(() => {
        if (uploadStatus === 'SUCCESS') {
            cogoToast.success('???????????? ?????????? ???? ???????????? ?????????? ????');
        } else if (uploadStatus === 'ERROR') {
            cogoToast.error('???????????? ?????????? ???? ?????? ?????????? ????');
        }
        setTypeFile(null)
        setUploadActive(false)
    }, [uploadStatus])

    useEffect(() => {
        if (typeFile !== null) {
            setUploadActive(true)
        }
    }, [typeFile])

    return AdminRequireLoginMiddleware(
        <div>
            <SpinnerLoading show={uploadStatus === 'LOADING' || groupsStatus === 'LOADING'}/>
            <div className={'container d-flex justify-content-center pt-5'}>
                <div className={'col-12 col-lg-7'}>
                    <div className={'mx-5 mb-5'}>
                        <label htmlFor="select">???????? ?????? ???? ???????????? ????????:</label>
                        <select className={'form-control'} name="select" id=""
                                onChange={(e) => setSelectedGroup(e.target.value)}>
                            <option key={'null'} value={null}>???????????? ????????</option>
                            {groups.map((item, index) => {
                                return <option key={index} value={item.id}>{item.name}</option>
                            })}
                        </select>
                        {selectedGroup && <div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ????????</label>
                                <input onChange={(event) => {
                                    setFieldFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {fieldFile &&
                                <button type={'button'} className={'btn btn-primary align-self-end mt-2'}
                                        onClick={() => {
                                            setTypeFile('FIELD')
                                        }}>?????????? ???????? ????????
                                </button>}
                            </div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ??????????</label>
                                <input onChange={(event) => {
                                    setTendencyFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {tendencyFile &&
                                <button className={'btn btn-primary align-self-end mt-2'} onClick={() => {
                                    setTypeFile('SUBTENDANCY')
                                }}>?????????? ???????? ??????????
                                </button>}
                            </div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ??????</label>
                                <input onChange={(event) => {
                                    setCourseFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {courseFile &&
                                <button className={'btn btn-primary align-self-end mt-2'} onClick={() => {
                                    setTypeFile('COURSE')
                                }}>?????????? ???????? ??????
                                </button>}
                            </div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ???????? ????????</label>
                                <input onChange={(event) => {
                                    setRotbeZaribFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {rotbeZaribFile &&
                                <button className={'btn btn-primary align-self-end mt-2'} onClick={() => {
                                    setTypeFile('ROTBE_ZARIB')
                                }}>?????????? ???????? ???????? ????????
                                </button>}
                            </div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ????????????</label>
                                <input onChange={(event) => {
                                    setNotebookFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {notebookFile &&
                                <button className={'btn btn-primary align-self-end mt-2'} onClick={() => {
                                    setTypeFile('NOTEBOOK')
                                }}>?????????? ???????? ????????????
                                </button>}
                            </div>
                            <div className={'mt-4'}>
                                <label htmlFor="">???????? ???????????? ????????</label>
                                <input onChange={(event) => {
                                    setPriorityFile(event.target.files[0])
                                }} className={'form-control'} type="file"/>
                                {priorityFile &&
                                <button className={'btn btn-primary align-self-end mt-2'} onClick={() => {
                                    setTypeFile('PRIORITY')
                                }}>?????????? ???????? ???????????? ????????
                                </button>}
                            </div>
                        </div>}

                    </div>

                </div>
            </div>
        </div>
    )
}
