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
    {
        name: 'register',
        url: 'v1/user/register',
        method: 'post',
    },
    {
        name: 'confirm',
        url: 'v1/user/confirm',
        method: 'post',
    },
    {
        name: 'takhminFree',
        url: 'v1/user/takhmin-free',
        method: 'post',
    },
    {
        name: 'pay',
        url: 'v1/user/pay',
        method: 'post',
    },
];

function preProcessUser(urlName, params) {
    return PreProcess(apiAddress, urlName, params);
}

function postProcessUser(urlName, data) {
    switch (urlName){
        case 'register':
            return {}
        case 'confirm':
            return {
                freeTries:data.freeTries
            }
        case 'takhminFree':
            return {
                freeTries:data.number
            }
        default:
            return {
                list: data,
            };
    }
}

export {preProcessUser, postProcessUser};
