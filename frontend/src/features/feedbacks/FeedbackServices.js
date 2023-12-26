import axios from "axios";
const API_URL = 'http://localhost:5000/api/feedback/'



export const submitFeedback = async(responseData)=>{
    // console.log(responseData)
    // console.log(responseData.token)
  
    const config = {
      headers:{
        Authorization: `Bearer ${responseData.token}`,
      },
    }
    const response = await axios.post(API_URL+'submit',responseData,config)
    console.log(response.data)
  
    return response.data
  }
  