import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='d-flex justify-content-center align-items-center w-100 flex-column bg-success' >
      <div className='d-flex align-items-center justify-content-between text-light mt-5'>
        <h6>Get connected with us on social networks : </h6>
        <div className='d-flex justify-content-evenly align-items-center' style={{marginLeft:'150px'}}>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-instagram fa-2x ms-2"></i></Link>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-twitter fa-2x ms-2"></i></Link>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-linkedin fa-2x ms-2"></i></Link>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-facebook fa-2x ms-2"></i></Link>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-brands fa-instagram fa-2x ms-2"></i></Link>
            <Link to={'https://bootswatch.com/'}  style={{textDecoration:'none',color:'white'}}><i class="fa-solid fa-envelope  fa-2x ms-2"></i></Link>
          </div>
      </div>
      <div className="footer d-flex justify-content-evenly align-items-center w-100 mt-5 text-light">
        <div className='websites' style={{width:'400px'}}>
          <h4><i class="fa-solid fa-user-tie mb-3 text-warning"></i>{' '}Suhail Muhammed</h4>
          <h6 className='d-flex justify-content-center align-items-center text-center'>A software development project is a complex undertaking by two or more persons within the boundaries of time, budget, and staff resources that produces new or enhanced computer code that adds significant business value to a new or existing business process.</h6>
        </div>
        <div className='links d-flex flex-column'>
          <h4>Products</h4>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>React JS</Link>
          <Link to={'/home'} style={{textDecoration:'none',color:'white'}}>Angular</Link>
          <Link to={'/watchhistory'} style={{textDecoration:'none',color:'white'}}>MongoDB</Link>
          <Link to={'/watchhistory'} style={{textDecoration:'none',color:'white'}}>Express JS</Link>
          <Link to={'/watchhistory'} style={{textDecoration:'none',color:'white'}}>Node JS</Link>
        </div>
        
        <div className='contacts'>
          <h4 className='mb-3'>Contact Us</h4>
          <div className="d-flex mb-3">
            <input type="text" className='form-control' placeholder='Enter Your Email ID' />
            <button className='btn btn-warning ms-2'>Subscribe</button>
          </div>
          
        </div>
      </div>
      <p className='mt-5 text-danger'>copyright @ 2023 project-fair. Built with React.</p>
    </div>
  )
}

export default Footer   