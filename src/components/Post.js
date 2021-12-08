import React, { useState, useEffect } from 'react';
import { useAuth } from '../authContext';
import { db } from '../firebase';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = () => {

    const { blogPost, currentUser } = useAuth();
    const [ blogItems, setBlogItems ] = useState([]);
    const [ loading, setLoading ] = useState(true)


    const fetchPost = async () => {

        try{
            const response = db.collection('blogs').orderBy('createdAt', 'desc')

            const data = await response.get()

            setBlogItems([])

            data.docs.forEach(blogItem => {

                setBlogItems(item => [...item, blogItem.data() ])
                
            })
            
            setLoading(false)
                        
        }catch(error) {
            console.log(error)
        }
            
    }

    useEffect(() => {

        fetchPost()

    }, [])


    return ( 
        <div className="post">
            <div className="post-title">
                <h2>POSTS</h2>
                <p>View All Posts Blog posts here.</p>
            </div>
            
            <div className="post-card-section">
                    {

                    !loading ?

                    blogItems.map((blog) => {
                        return(
                            <Link to={`/blog/${blog.id}`} style={{textDecoration:'none'}}>
                                <div className="post-card" key={blog.id}>
                                    <h2>{blog.title}</h2>
                                    <i> - {blog.author}</i>
                                    <p>{moment(blog.createdAt.toDate().toString()).format('MMMM Do YYYY')}</p>
                                </div>
                            </Link>
                        )
                    })
                    :
                    <h2>In a Minute...</h2>
                    }
            </div>
        </div>
     );
}
 
export default Post;