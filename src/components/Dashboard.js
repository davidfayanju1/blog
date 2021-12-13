import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { BsFilePost } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import NewPost from './NewPost';
import Profile from './Profile';
import { FaUserCircle } from 'react-icons/fa';


const Dashboard = () => {

    const [userData, setUserData] = useState('');
    const [userError, setUserError] = useState('');

    const navigate = useNavigate();
    const { logout, currentUser, deleteAcc } = useAuth();
    
    


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

            const data = query.docs[0].data();

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

    const [ deleteAcctPop, setDeleteAcctPop ] = useState(false);
    const [ openSidebar, setOpenSidebar ] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    }

    const showDeleteAcct = () => {
        setDeleteAcctPop(true)
    }

    const closeDeletePop = () => {
        setDeleteAcctPop(false)
    }

    const deleteBtn = (e) => {
        e.preventDefault();
        deleteAcc();
    }

    return ( 
        <div className="dashboard">
            <div className="alert">{ userError }</div>

            <aside className={`sidebarBlock ${openSidebar ? 'active' : 'not-active'}`}>
                <h5>Hi, { userData }</h5>
                
                <div>
                    <div className= {`sidebar-link  ${showComp ? 'page-active': null}`} onClick={ profilePage }>
                        <FaUserCircle className='side-link'/>
                        <p>Profile</p>    
                    </div>
                    <div className= {`sidebar-link  ${!showComp ? 'page-active': null}`} onClick={ blogPage }>
                        <BsFilePost className='side-link'/>
                        <p>Posts</p>    
                    </div>
                    <Link to="/" className= 'sidebar-link' style={{textDecoration: 'none'}}>
                        <AiFillHome className='side-link'/>
                        <p>Home</p>    
                    </Link>
                </div>                    
                <button className="logout-btn" onClick = { logoutBtn }>LOGOUT</button>
                <button className="delete-acct-btn" onClick = { showDeleteAcct }>DELETE ACCOUNT</button>
            </aside>

            <>
                {
                    deleteAcctPop && 
                    <div className="delete-acct-pop">
                        <div className="del-acct-card">
                            <p>Are You Sure You want to do this?</p>

                            <div className="option-btn">
                                <button onClick = { deleteBtn }>YES</button>
                                <button onClick = { closeDeletePop }>Cancel</button>
                            </div>
                        </div>
                    </div>
                }   
            </>

            

            <div className="pages">
                    {showComp ? <Profile toggleSidebar={ toggleSidebar } openSidebar={ openSidebar }/> : <NewPost toggleSidebar={ toggleSidebar } openSidebar={ openSidebar }/>}
            </div>
        </div>
     );
}
 
export default Dashboard;