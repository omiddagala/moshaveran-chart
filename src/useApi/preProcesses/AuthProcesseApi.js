import PreProcess from './PreProcess';

const apiAddress = [
    {
        name: 'login',
        url: 'oauth/token',
        method: 'post',
        loginHeader: true
    },
];

function preProcessAuth(urlName, params) {
    return PreProcess(apiAddress, urlName, params);
}

function postProcessAuth(urlName, data) {
    switch (urlName) {
        case 'login':
            return {
                access_token: data.access_token,
                role:data.user.role
            };
    }
}

export {preProcessAuth, postProcessAuth};
