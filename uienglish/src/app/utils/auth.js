export const getToken = () =>{
    return localStorage.getItem("token");
}

export const setAuthHeader = () =>{
    const token = getToken();
    if(token){
        return {Authorization: `Bearer ${token}`}
    }
    return {};
};