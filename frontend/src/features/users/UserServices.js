import axios from 'axios'
const API_URL = 'http://localhost:5000/api/user/'


export const registerStudent = async(userData)=>{
    const response = await axios.post(API_URL+'register',userData)
        .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data.message);
                throw new Error(error.response.data.message) 
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }  
            else if (error.request) {
                // console.log(error.request);
            } 
            else {
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        })
        if(response.data){
            sessionStorage.setItem('user',JSON.stringify(response.data.token))
            return response.data
        }
}
export const adminLogin = async(userData)=>{
    // console.log(userData)
    const response = await axios.post(API_URL+'alogin',userData)
        .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data.message);
                throw new Error(error.response.data.message) 
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }  
            else if (error.request) {
                // console.log(error.request);
            } 
            else {
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        })
        if(response.data){
            sessionStorage.setItem('user',JSON.stringify(response.data.token))
            return response.data
        }
}
export const logout = async(token)=>{
    // console.log(token)
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL+'logout',true,config)
    return response.data
    // console.log(response.data)
}

export const resetLogin = async(resetData)=>{
    // console.log(resetData)

    const config = {
        headers:{
            Authorization:`Bearer ${resetData.token}`
        },
    }
    const response  = await axios.post(API_URL+'reset',resetData,config)
    // console.log(response.data)

    return response.data
}

export const createSession = async(sessionData)=>{
    // console.log(sessionData)
    const config = {
        headers:{
            Authorization:`Bearer ${sessionData.token}`
        },
    }
    const response  = await axios.post(API_URL+'createsession',sessionData,config)

    // console.log(response.data)

    return response.data


}

export const getSession = async()=>{
    const token = sessionStorage.getItem('user')
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        },
    }

    const response = await axios.post(API_URL+'getsession',true,config)
    // console.log(response.data)

    return response.data
}