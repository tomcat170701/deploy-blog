import React from 'react'
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom'
import api from './api/posts'

const Newpost = ({posts, postTitle, setPostTitle, setPosts, postBody, setPostBody}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id=posts.length?posts[posts.length - 1].id +1:1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title: postTitle, datetime, body:postBody};
    try{
    const response = await api.post('/posts',newPost);
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
    } catch(err){
      console.log(`Error: ${err.message}`);

    }
  }
  
  
  return (
    <main className='NewPost'>
      <h1>New Post</h1>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor="posttitle">Title:</label>
        <input 
             id='postTitle'
             type='text'
             required
             value={postTitle}
             onChange={(e)=>setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post</label>
        <textarea 
                id='postBody'
                required
                value={postBody}
                onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default Newpost