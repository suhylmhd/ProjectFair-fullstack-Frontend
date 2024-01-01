import axios from "axios"


export const commonAPI = async(httpRequest,url,reqBody,requestHeader)=>{  

    const reqConfig = {
        method:httpRequest,
        url,
        data:reqBody,
        headers:requestHeader?requestHeader:{"Content-Type":"application/json"} // since we have two types of contents to uploads
    }

    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}