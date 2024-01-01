import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../Assets/graphic-designer-desk.jpeg-1.webp'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'

function Home() {

    // state to store token
    const [isLogin , setIsLogin] = useState(false)

    const [homeProject , setHomeProject] = useState([])
    //funcion to get home project
    const getHomeProject = async()=>{
        const result = await homeProjectAPI()
        console.log(result);
        setHomeProject(result.data)
    }

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogin(sessionStorage.getItem("token"))
        }
        else{
            setIsLogin("")
        }
    },[])
    
    useEffect(()=>{
        getHomeProject()
    },[])

    console.log(isLogin);

    
  return (
    <>
        <div style={{width:'100%',height:'100vh',backgroundColor:'yellowgreen'}} className='mb-5'>
            <div className="container-fluid rounded p-5">
                <Row>
                    <Col sm={12} md={6} style={{marginTop:'200px'}}>
                        <h1 className='text-light mb-4' style={{fontSize:'80px'}}>Project Fair</h1>
                        <p>One stop destination for all software development Project</p>
                        {isLogin?
                            <Link to={'/dashboard'}>
                            <button className='btn btn-success rounded'>Manage Project<i class="fa-solid fa-arrow-right ms-3"></i></button>
                        </Link>:
                         <Link to={'/login'}>
                         <button className='btn btn-success rounded'>Get Started<i class="fa-solid fa-arrow-right ms-3"></i></button>
                        </Link>
                        }
                       
                    
                    </Col>
                    <Col sm={12} md={6} style={{marginTop:'150px'}} >
                        <img className='w-75' src={titleImage} alt="" />
                    </Col>
                </Row>
            </div>
        </div>

        {/* section for all projects */}
        <div className='all-project mt-5'>
            <div className='text-center'>
                <h1>EXPLORE OUR PROJECTS</h1> 

                <marquee scrollAmount={20} className='mt-5 mb-5'> 

                    <div className='d-flex'>
                       {homeProject?.length>0?
                        homeProject.map((item)=>( 
                            <div className='ms-5' style={{width:'500px'}}>
                                <ProjectCard project = {item}/>
                            </div>
                        )) 
                        : null
                       }
                    </div>

                </marquee>

                <div className='text-center mt-5    mb-5'>
                    <h5 ><Link to={'/project'} style={{textDecoration:'none'}} className='text-warning'>See More Projects</Link></h5>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home