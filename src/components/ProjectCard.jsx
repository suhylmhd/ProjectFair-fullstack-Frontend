import React from 'react'
import Card from 'react-bootstrap/Card';
import projectImage from '../Assets/Screenshot 2023-11-22 105939.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseUrl';

function ProjectCard({project}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
        <Card className='shadow text-center' onClick={handleShow}>
            <Card.Img variant="top" height={"250px"} src={project?`${BASE_URL}/uploads/${project.projectImage}`:projectImage} />
            <Card.Body>
                <Card.Title>{project.title}</Card.Title>
            </Card.Body>
        </Card>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size='lg'
        >
            <Modal.Header closeButton>
            <Modal.Title>{project.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <img width={'100%'} src={project?`${BASE_URL}/uploads/${project.projectImage}`:projectImage} alt="no image" />
                    </Col>
                    <Col md={6}>
                        <h4 className='fw-bolder'>Discription</h4>
                        <p>{project.overview}</p>
                        <p><span className='fw-bolder'>Technologies</span>:{project.language}</p>
                    </Col>
                </Row>
                <div className='d-flex'>
                    <a href={project.github} target='_blank' style={{color:'black'}}><i class="fa-brands fa-github fa-2x ms-3"></i></a>
                    <a href={project.website} target='_blank' style={{color:'black'}}><i class="fa-solid fa-link fa-2x ms-5"></i></a>
                </div>
            </Modal.Body>
           
        </Modal> 
    </>
  )
}

export default ProjectCard