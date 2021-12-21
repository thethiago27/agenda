const IS_SERVER = typeof window !== 'undefined';

export const session = {
    setToken: (token: string) => {
       localStorage.setItem('token', token);
    },
    getToken: () => {
        return IS_SERVER && localStorage.getItem('token');
    },
    removeToken: () => {
        IS_SERVER &&  localStorage.removeItem('token');
    },
}



