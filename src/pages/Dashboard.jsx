import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {

  const [username , setUsername]= useState("")
  useEffect(() => {
    // Get the user data from sessionStorage
    const existingUserString = sessionStorage.getItem('existingUser');

    // Check if existingUserString is not null
    if (existingUserString) {
      // Parse and set the username
      const existingUser = JSON.parse(existingUserString);
      setUsername(existingUser.username);
    }
  }, []);

  console.log(username);
  return (
    <>
      <Header Dashboard/>

      <h3 className='mt-5'>Welcome <span className='text-warning'>{username}</span></h3>
      <Row className='container-fluid mt-5'>
        <Col sm={12} md={8}>
          <MyProject/>
        </Col>
        <Col sm={12} md={4}>
          <Profile/>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard