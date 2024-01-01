import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { loginAPI, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from '../Contexts/ContextShare';

function Auth({register}) {
    
    const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext) 

    //to hold the value from input box
    const [userData , setUserData] = useState({
        username : "",
        email : "",
        password : ""
    })

    //navigate 
     const navigate = useNavigate()

    const  registerForm = register?true:false

    //register function
    const handleRegister = async(e)=>{

        e.preventDefault()
        
        const {username,email,password} = userData

        if(!username || !email || !password){
            toast.info('please fill the form completely')
        }
        else{
            const result = await registerAPI(userData)
            //console.log(result.data);

            if (result.status === 200) {
                toast.success(`${result.data.username} is successfully registered`)
                setUserData({
                    username : "",
                    email : "",
                    password : ""
                })
                //move to login page
                navigate('/login')
                
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    //Login Function
    const handleLogin = async(e)=>{
        e.preventDefault()

        //destructure
        const {email , password} = userData
        if (!email || !password) {
            toast.info('please fill the form completely')
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status===200){
                toast.success('Login Successfull')
                
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                
                setUserData({
                    username : "",
                    email : "",
                    password : ""
                })
                setIsAuthToken(true)
                //navigate to home
                setTimeout(()=>{
                    navigate('/')
                },2000)
                
                
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

  return (
    <>
        <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
            <div className="w-75 container ">
                <Link to={'/'} style={{textDecoration:'none',color:'blue'}}><i class="fa-solid fa-arrow-left me-2"></i>Back to Home</Link>

                <div className="card bg-success p-5 rounded">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png" alt="" width={'100%'} />
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex align-items-center flex-column'>
                                <h1 className='text-center text-light'><i class="fa-brands fa-stack-overflow"></i>Project Fair</h1>
                                <h5 className='text-light mt-3'>
                                    {
                                        registerForm? "Sign up to your  Account" : "Sign in to your  Account"
                                    }
                                </h5>
                                <Form className='mt-4'>
                                    {
                                        registerForm &&
                                        <Form.Group className='mb-3' contextMenu='formBasicEmail'>
                                            <Form.Control type='text' placeholder='username' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
                                        </Form.Group>
                                    }

                                        <Form.Group className='mb-3' contextMenu='formBasicEmail'>
                                            <Form.Control type='email' placeholder='Email Id'  value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                                        </Form.Group>

                                        <Form.Group className='mb-3' contextMenu='formBasicEmail'>
                                            <Form.Control type='password' placeholder='Password' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                                        </Form.Group>

                                    {
                                        registerForm ?
                                        <div>
                                            <button onClick={handleRegister} className='btn btn-warning round mt-3'>Register</button>
                                            <p>Already a User ? Click her to <Link to={'/login'} style={{color:'blue',textDecoration:'none'}}>Login</Link></p>
                                        </div>:
                                         <div>
                                            <Link to={'/dashboard'}>
                                                <button onClick={handleLogin} className='btn btn-warning round mt-3'>Login</button>
                                            </Link>
                                         
                                            <p>New User ? Click her to <Link to={'/register'} style={{color:'blue',textDecoration:'none'}}>Register</Link></p>
                                        </div>
                                    }
                                </Form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default Auth