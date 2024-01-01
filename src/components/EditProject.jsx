import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BASE_URL } from '../services/baseUrl';
import { editProjectAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectResponseContext } from '../Contexts/ContextShare';


function EditProject({project}) {
    
    const {editProjectResponse , setEditProjectResponse} = useContext(editProjectResponseContext)

    const [show, setShow] = useState(false);

    const [preview , setPreview] = useState("")

    const [projectDetails , setProjectDetails] = useState({
        id : project._id,
        title : project.title,
        language : project.language,
        github : project.github,
        website : project.website,
        overview : project.overview,
        projectImage :""
    
      })
    

    const handleClose = () => {
        setShow(false);
        clearBtn()
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage));
        }
    }, [projectDetails.projectImage]);


    //to remove only the edited content
    const clearBtn = ()=>{
        setProjectDetails({
            title : project.title,
            language : project.language,
            github : project.github,
            website : project.website,
            overview : project.overview,
            projectImage :""
        })
        setPreview("")
    }

    const handleUpdate = async()=>{
        const {id,title,language,github,website,overview,projectImage} = projectDetails

        if(!title || !language || !github || !website || !overview){
            toast.info('Please Fill the Form Completely')
        }
        else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

            const token = sessionStorage.getItem("token")
            
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }
                const result = await editProjectAPI(id,reqBody,reqHeader)
                console.log(result);

                if(result.status===200){
                    console.log(result.data);
                    toast.success('Updated Successfully')
                    handleClose()
                    setEditProjectResponse(result.data)
                }
                else{
                    console.log(result.response.data);
                }

            }
            else{
                const reqHeader = {
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                  }
                const result = await editProjectAPI(id,reqBody,reqHeader)
                console.log(result);
                
                if(result.status===200){
                    console.log(result.data);
                    toast.success('Updated Successfully')
                    handleClose()
                    setEditProjectResponse(result.data)
                }
                else{
                    console.log(result.response.data);
                }
            }
        }
    }
    
  return (
    <>
        <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>

        <Modal  show={show} onHide={handleClose} size="lg" centered>
          
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className='col-lg-6'>
              <label  >
                  <input type="file" style={{display:'none'}} />
                  <img width={'200px'} height={'200px'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="No image"  onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
              </label>
            </Col>
            <Col className='col-lg-6'>
              <input type="text" className='form-control mb-2' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>

              <input type="text" className='form-control mb-2' placeholder='Language Used'  value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />

              <input type="text" className='form-control mb-2' placeholder='Github Link'  value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>

              <input type="text" className='form-control mb-2' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />

              <InputGroup>
                <Form.Control as="textarea" placeholder='Project Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={clearBtn} >Cancel</Button>

          <Button variant="success" onClick={handleUpdate} >Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default EditProject