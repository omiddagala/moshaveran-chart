// key : string;
const get = async (key) => {
    let result = localStorage.getItem(key);
    return result ? JSON.parse(result) : false;
};

const store = async (key, parameters) => {
    try {
        await localStorage.setItem(key, JSON.stringify(parameters));
        return true;
    } catch (e) {
        return false;
    }
};

const refresh = async (key, parameters) => {
    try {
        await localStorage.removeItem(key).then(() => {
            localStorage.setItem(key, JSON.stringify(parameters));
        });
        return true;
    } catch (e) {
        return false;
    }
};

const remove = async (key) => {
    try {
        await localStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
};

export default {get, refresh, store, remove};
