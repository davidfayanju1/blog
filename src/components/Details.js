import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAuth } from '../authContext';

const Details = () => {

        const [ blogItems, setBlogItems ] = useState([]);
        const [ loading, setLoading ] = useState(true)

        // const { currentUser } = useAuth();

       const { id } = useParams()

       const fetchPost = async () => {

        try{
            const response = db.collection('blogs')

            const data = await response.get()

            setBlogItems([])

            data.docs.forEach(blogItem => {

                if(blogItem.data().id ===   id ){
                    setBlogItems(item => [...item, blogItem.data() ])
                }else{
                    return null;
                }

                console.log(blogItem)
                setLoading(false)    
            })
            
                        
        }catch(error) {
            console.log(error)
        }
            
    }

    useEffect(() => {

        fetchPost()

    }, [])

    return ( 
        <div className="blog-details">
            <div className="details-header">
                {/* <img src={ currentUser ? currentUser.photoURL : currentUser.displayName} alt="moving person" /> */}
                <Link to="/">
                    <button>Home</button>
                </Link>
            </div>            
            <div className="details-card-section">
                    {
                    !loading ? 
                    blogItems &&  blogItems.map((blog) => {
                            return(
                                <div className="details-card" key={blog.id}>
                                    <i className="blog-author"> - {blog.author}</i>
                                    <h2>{blog.title}</h2>
                                    <p>{moment(blog.createdAt.toDate().toString()).format('MMMM Do YYYY')}</p>
                                    <p>{blog.blog}</p>
                                </div>
                            )
                        })
                    :
                    <h3>Loading Details...</h3>
                    }
            </div>
        </div>
     );
}
 
export default Details;