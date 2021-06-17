import PreProcess from './PreProcess';

const apiAddress = [
    {
        name: 'groups',
        url: 'v1/user/groups',
        method: 'get',
    },
    {
        name: 'fields',
        url: 'v1/user/fields',
        method: 'post',
    },
    {
        name: 'tendencies',
        url: 'v1/user/subtendancies',
        method: 'post',
    },
    {
        name: 'courses',
        url: 'v1/user/courses',
        method: 'post',
    },
    {
        name: 'prediction',
        url: 'v1/user/prediction',
        method: 'post',
    },
];

function preProcessUser(urlName, params) {
    return PreProcess(apiAddress, urlName, params);
}

function postProcessUser(urlName, data) {
    return {
        list: data,
    };
}

export {preProcessUser, postProcessUser};
