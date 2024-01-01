import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {

  const [allProject , setAllProject] = useState([])
  const [searchKey , setSearchKey] = useState("")
  const [isToken , setIsToken] = useState(false)

  const getAllProject = async()=>{

    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      console.log(result.data);
      setAllProject(result.data)
    }
  }

  console.log(searchKey);

  useEffect(()=>{
    getAllProject()
  },[searchKey])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])
 
  console.log(isToken);  
  return (
    <>
      <Header/>
      <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <h1>All Projects</h1>
        <div className='d-flex mt-5 w-25'>
          <input type="text" className='form-control' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search the Projects using Technologies' />
          <i style={{marginLeft:'-45px',color:'lightgray'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
      <Row className='mt-5 mb-5 container-fluid'>
       {allProject?.length>0?
        allProject.map((item)=>( <Col className='mb-5' sm={12} md={6} lg={4}>
          <ProjectCard project ={item } /> 
        </Col>))
          : 
          <div>
            {isToken?<p className='text-danger fs-3 text-center'>Sorry No Project Currently Available</p>:
            <div className='d-flex justify-content align-items-center flex-column'>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZyj_OvxWLphhKByHBNqoJDWr2LaeBpGU8yeL93B8HIA&s" alt="NO IMAGE" height={'200px'} width={'200px'}/>
              <p className='text-danger fs-3 mt-4 '>Please <Link to={'/login'} style={{textDecoration:'none'}}>Login</Link> to view more Project</p>
            </div>}
          </div>
        }
      </Row>

    </>
  )
}

export default Project
