import PreProcess from './PreProcess';

const apiAddress = [
    {
        name: 'groups',
        url: 'v1/admin/groups',
        method: 'get',
        auth: true
    },
    {
        name: 'fields',
        url: 'v1/user/fields',
        method: 'post',
        auth: false
    },
    {
        name: 'upload',
        url: 'v1/admin/upload',
        method: 'post',
        auth: true
    },
    {
        name: 'ranks',
        url: 'v1/admin/level-ranks',
        method: 'post',
        auth: true
    },
    {
        name: 'addAndEdit',
        url: 'v1/admin/level-rank-add',
        method: 'post',
        auth: true
    },
    {
        name: 'delete',
        url: 'v1/admin/level-rank-delete',
        method: 'post',
        auth: true
    },
    {
        name: 'choices',
        url: 'v1/admin/choices',
        method: 'post',
        auth: true
    },
    {
        name: 'choiceSingle',
        url: 'v1/admin/choice',
        method: 'post',
        auth: true
    },
    {
        name: 'second',
        url: 'v1/admin/second',
        method: 'post',
        auth: true
    },
];

function preProcessAdmin(urlName, params) {
    return PreProcess(apiAddress, urlName, params);
}

function postProcessAdmin(urlName, data) {
    switch (urlName) {
        case 'login':
            return {
                access_token: data.access_token,
            };
        default:
            return {list: data}
    }
}

export {preProcessAdmin, postProcessAdmin};
