import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { BsFilePost } from 'react-icons/bs';
import NewPost from './NewPost';
import Profile from './Profile';
import { FaUserCircle } from 'react-icons/fa';


const Dashboard = () => {

    const [userData, setUserData] = useState('');
    const [userError, setUserError] = useState('');

    const navigate = useNavigate();
    const { logout, currentUser } = useAuth();
    
    


    const logoutBtn = () => {
        logout();
        navigate('/');
    }

    const fetchData = async () => {

        try{
            const query = await db
            .collection('users')
            .where("uid", "==", currentUser.uid)
            .get();

            const data = await query.docs[0].data();

            setUserData(data.name);
        }catch (err){
            setUserError('Error! Inavlid Data');  
            console.log(err);         
        }

    }

    useEffect(()=>{

        fetchData();
        
    }, [])

    const [showComp, setShowComp] = useState(true);

    const profilePage = () => {
        setShowComp(true);
        setOpenSidebar(false);
    }

    const blogPage = () => {
        setShowComp(false)
        setOpenSidebar(false);
    }

    const [ openSidebar, setOpenSidebar ] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    return ( 
        <div className="dashboard">
            <div className="alert">{ userError }</div>

            <aside className={`sidebarBlock ${openSidebar ? 'active' : 'not-active'}`}>
                <h5>Hi, { userData }</h5>
                
                <div>
                    <div className= {`sidebar-link  ${showComp ? 'page-active': null}`} onClick={ profilePage }>
                        <FaUserCircle />
                        <p>Profile</p>    
                    </div>
                    <div className= {`sidebar-link  ${!showComp ? 'page-active': null}`} onClick={ blogPage }>
                        <BsFilePost />
                        <p>Posts</p>    
                    </div>
                </div>                    
                <button onClick = { logoutBtn }>LOGOUT</button>
            </aside>

            <div className="pages">
                    {showComp ? <Profile toggleSidebar={ toggleSidebar }/> : <NewPost toggleSidebar={ toggleSidebar }/>}
            </div>
        </div>
     );
}
 
export default Dashboard;