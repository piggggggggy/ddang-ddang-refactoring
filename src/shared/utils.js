export const setDataToSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
};

export const setCookieDay = (name, value) => {
    const date = new Date();

    date.setTime(date.getTime() + 1 * 1000 * 60 * 60 * 24);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;`;
};

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const part = parts.pop();
        return part.split(";").shift();
    }
};
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;path=/;`;
};
