import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { addProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext } from '../Contexts/ContextShare';




function Addproject() {

  //useContext hook is used to access  the contwext api
const {addProjectResponse , setAddProjectResponse} =useContext(addProjectResponseContext)
  //state to hold the value from the inputbox
  const [projectDetails , setProjectDetails] = useState({
    title : "",
    language : "",
    github : "",
    website : "",
    overview : "",
    projectImage : ""

  })

  const [token , setToken] = useState("")

  const [show, setShow] = useState(false);

  //to hold the url of image 
  const [preview , setPreview] = useState()
  console.log(projectDetails);
  useEffect(()=>{
    if(projectDetails.projectImage){
      //predefined method in javascript - url - createObjectURL - files will be converted into url 
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
    
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])
  console.log(preview);
  console.log(token);

  const handleClose = () => {
    setShow(false);
    clearBtn()
  }
  const handleShow = () => setShow(true);

  const clearBtn = () => {
    setProjectDetails({
      title : "",
      language : "",
      github : "",
      website : "",
      overview : "",
      projectImage : ""
    })
    setPreview("")
  }

  const handleAdd = async(e)=>{
    e.preventDefault()
    const {title,language,github,website,overview,projectImage} = projectDetails
    if(!title || !language || !github || !website || !overview || !projectImage){
      toast.error("please fill the form completly")
    }
    else{
      //reqBody
      //if there is any uploadung content from the system. we should send the body in the form  of formdata
      //1) create object for the  class form data
      const reqBody = new FormData()

      //2) add value  to the formdata - append()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

      //reqHeader
      if(token){
        const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status===200){
        toast.success("Project Successfully Added")
        handleClose()
        setAddProjectResponse(result.data)
      }
      else{
        alert(result.response.data)
      }

      
      
    }}
  }

  return (
    <>
        <button onClick={handleShow} className='btn btn-success'>Add Project</button>


        <Modal  show={show} onHide={handleClose} size="lg" centered>
          
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className='col-lg-6'>
              <label  >
                  <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                  <img width={'200px'} height={'200px'} src={preview?preview:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRMYXL14qVwvyg7Xv7h4k7qTuC0MlqZhAJwgykQQWIYoUR2d6LJ"} alt="No image"  />
              </label>
            </Col>
            <Col className='col-lg-6'>
              <input type="text" className='form-control mb-2' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
              <input type="text" className='form-control mb-2' placeholder='Language Used' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
              <input type="text" className='form-control mb-2' placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
              <input type="text" className='form-control mb-2' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
              <InputGroup>
                <Form.Control as="textarea" placeholder='Project Overview'  value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={clearBtn}>Clear</Button>

          <Button variant="success" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default Addproject