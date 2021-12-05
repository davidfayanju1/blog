import React, { useState, useEffect} from 'react';
import Login from './components/Login';
import NewPost from './components/NewPost';
import app from './style/app.scss';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthProvider } from './authContext';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import PrivateRoute from './components/PrivateRoute';


function App() {

  const[ toggleLightMode, setToggleLightMode ] = useState(true);

    const toggle = () => {
      setToggleLightMode(!toggleLightMode);
      localStorage.setItem('toggle', JSON.stringify(toggleLightMode));
    };

    useEffect(() => {

      const take =  !JSON.parse(localStorage.getItem('toggle'));            
      setToggleLightMode(take);

    }, []);


  return (

    <AuthProvider>
      <div className={`App ${toggleLightMode ? 'lightmode' : 'darkmode'}`}>
        <Routes>
            <Route exact path="/" element={<Home  toggleLightMode={ toggleLightMode } toggle={ toggle }/>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/newpost" element={<NewPost />}/>
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element= { <PrivateRoute><Dashboard /></PrivateRoute> } />
            <Route exact path="/blog/:id" element={<Details />} />
        </Routes>
      </div>
    </AuthProvider>   
  );
}

export default App;
