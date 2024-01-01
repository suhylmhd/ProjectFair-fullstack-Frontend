
import { BASE_URL } from "./baseUrl"
import { commonAPI } from "./commonAPI"


// register API
export const registerAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

//Login API
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// add project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//home project
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-project`)
}


//all project
export const allProjectAPI = async(searchKey,reqHeader)=>{
    // query parameter = path?key=value
    return await commonAPI("GET",`${BASE_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

//user project
export const allUserProject = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-project`,"",reqHeader)
}



//edit user project
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
    // path parameter  - :id - router
    return await commonAPI("PUT",`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
}

// delete project
export const deleteProjectAPI = async(projectId,reqHeader)=>{
    // path parameter  - :id - router
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
}

//edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
    // path parameter  - :id - router
    return await commonAPI("PUT",`${BASE_URL}/user/edit`,reqBody,reqHeader)
}
