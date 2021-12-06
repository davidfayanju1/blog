import React, { useState, useRef, useEffect } from 'react';
import profile from '../images/profile.png';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useAuth } from '../authContext';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { GiHamburgerMenu } from 'react-icons/gi';

const Profile = ({ toggleSidebar }) => {

    const display = useRef();
    const [loading, setLoading ] = useState(false);
    const [ file, setfile ] = useState(profile)
    const { updateUserProfile, currentUser } = useAuth();
    const [btn, setBtn ] = useState(false)
   

    const handleClick = (e) => {

        const image = e.target.files[0]

        const storage = getStorage()
        const storageRef = ref(storage, `images/${image.name}`)

        uploadBytes(storageRef, image)
        .then((snapshot) => {
            
            getDownloadURL(storageRef)
            .then((url) => {
                setfile(url)
            })
            .catch((err)=> {
                console.log(err)
            })

        }).catch((err) => {
            console.log(err)
        })

    }
    
    
    const formSubmit = (e) => {        
        e.preventDefault();
        updateUserProfile(display.current.value, file);

        // if(file !== profile){
        //     setLoading(true)            
        // }else{
        //     console.log('EQUAL')
        // }
    }

    useEffect(() => {

        if(file === profile){
            setLoading(true)

        }else{
            setLoading(false)
        }

    },[file, profile, loading])
    
  
    return ( 
        <div className="profile">
            <div className="profile-header">
                <h2>Profile </h2>
                <GiHamburgerMenu  onClick={ toggleSidebar } id="hamburger-icon"/>
            </div>
            <div className="profile-picture" >
                <img src={currentUser.photoURL === null ?  profile : currentUser.photoURL } alt="profile" />
                <p>{currentUser.displayName === null ? 'Set Display Name' : currentUser.displayName}</p>
            </div>

            {/* <div className="profile-data">
                <div className="mail">
                    <label htmlFor="email">Email:</label>
                    <p>User Email</p>
                </div>
            </div> */}
            

            <form onSubmit={ formSubmit }>

                <label htmlFor="upload">
                    <input type="file" id="upload"  accept=".jpeg, .png" onChange={ handleClick }/>
                    <BsFillPlusCircleFill  style={{ fontSize: '2rem'}}  id="upload"/>
                </label>                
                <div className="profile-data">
                    <div className="display-name">
                        <label htmlFor="displayName">Display Name</label>
                        <input type="text" placeholder="Update Display Name" ref={ display }/>
                    </div>
                </div>

                <div className="submit-button">
                    <button disabled={ loading }>UPDATE PROFILE</button>
                </div>
            </form>
        </div>
     )
}
 
export default Profile;