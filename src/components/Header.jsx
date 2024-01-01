import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Header({Dashboard}) {
  
  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext) 

  const navigate =useNavigate()

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")   
    sessionStorage.removeItem("existingUser")
    setIsAuthToken(false)
    //navigate to homepage
    navigate('/')
  }
  return (
     <>
         <Navbar className="bg-success p-3 ">
            <Container>
                <Navbar.Brand href="#home">
                <Link to={'/'} className='text-light' style={{textDecoration:'none'}}>
                    <i class="fa-brands fa-stack-overflow fa-3x "></i>{' '} <span className='fs-3'>Project Fair</span>
                </Link>
                </Navbar.Brand>
                {
                  Dashboard &&
                 <Link to={'/'}>
                    <button onClick={handleLogout} className='btn btn-warning rounded'>Logout <i class="fa-solid fa-power-off ms-2"></i></button>
                 </Link>
                }
            </Container>
        </Navbar>
    </>
  )
}

export default Header