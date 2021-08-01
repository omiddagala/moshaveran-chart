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
    {
        name: 'packages',
        url: 'v1/choice/package',
        method: 'get',
    },
    {
        name: 'registerChoice',
        url: 'v1/choice/code/register',
        method: 'get',
    },
    {
        name: 'sms',
        url: 'v1/choice/code/sms',
        method: 'post',
    },
    {
        name: 'login',
        url: 'v1/choice/code/login',
        method: 'post',
    },
    {
        name: 'shares',
        url: 'v1/choice/shares',
        method: 'get',
    },
    {
        name: 'first',
        url: 'v1/choice/first',
        method: 'post',
    },
    {
        name: 'second',
        url: 'v1/choice/second',
        method: 'post',
    },
    {
        name: 'zaribha',
        url: 'v1/choice/codes',
        method: 'post',
    },
    {
        name: 'fieldsChoice',
        url: 'v1/choice/fields',
        method: 'get',
    },
    {
        name: 'off',
        url: 'v1/choice/off',
        method: 'get',
    },
    {
        name: 'levelsChoice',
        url: 'v1/choice/levels',
        method: 'post',
    },
    {
        name: 'provinces',
        url: 'v1/choice/provinces',
        method: 'get',
    },
    {
        name: 'tendenciesChoice',
        url: 'v1/choice/tendencies',
        method: 'get',
    },
    {
        name: 'subTendenciesChoice',
        url: 'v1/choice/subtendencies',
        method: 'get',
    },
    {
        name: 'periods',
        url: 'v1/choice/periods',
        method: 'get',
    },
    {
        name: 'chance',
        url: 'v1/choice/chance',
        method: 'post',
    },
    {
        name: 'save',
        url: 'v1/choice/save',
        method: 'post',
    },
    {
        name: 'priority',
        url: 'v1/choice/priority',
        method: 'post',
    },
    {
        name: 'uploadResult',
        url: 'v1/choice/upload/result',
        method: 'post',
        media:true
    },
];

function preProcessUser(urlName, params) {
    return PreProcess(apiAddress, urlName, params);
}

function postProcessUser(urlName, data) {
    switch (urlName){
        case 'registerChoice':
            return {
                code:data.code
            }
        case 'register':
        case 'sms':
            return {}
        case 'off':
            return {amount:data.amount}
        case 'confirm':
            return {
                freeTries:data.freeTries,
                code:data.code
            }
        case 'takhminFree':
            return {
                freeTries:data.number
            }
        case 'prediction':
            return {
                freeTries:data.freeTries,
                subtendancies:data.subtendancies
            }
        default:
            return {
                list: data,
            };
    }
}

export {preProcessUser, postProcessUser};
