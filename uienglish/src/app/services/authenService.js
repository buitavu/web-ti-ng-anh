const { default: axios } = require("axios")

const loginService = async (username,password) =>{
    try {
        const response = await axios.post('http://localhost:8080/api/users/auth/login',{
            username:username,
            password:password,
        });
        return response;
    } catch (error) {
        
    }
};

export {loginService};