
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './components/Auth';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project'
import Footer from './components/Footer';
import { useContext } from 'react';
import { isAuthTokenContext } from './Contexts/ContextShare';


function App() {
  
  const {isAuthToken , setIsAuthToken} = useContext(isAuthTokenContext)

  return (
    <div className="App">
      
      <Routes>
        
        <Route path='/' element={<Home/>}/>

        <Route path='/login' element={<Auth/>}/>

        <Route path='/register' element={<Auth register/>}/>

        <Route path='/dashboard' element={isAuthToken?<Dashboard Dashboard/>:<Home/>}/>

        <Route path='/project' element ={<Project/>}/>

      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
