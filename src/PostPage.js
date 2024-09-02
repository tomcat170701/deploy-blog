import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from './api/posts';

const PostPage = ({ posts, setPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(post => post.id.toString() === id);

  // State for editing
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);  // State to toggle between viewing and editing

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setIsEditing(false);  // Exit edit mode after saving
      navigate(`/post/${id}`);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <main className='PostPage'>
      {post ? (
        isEditing ? (
          // Edit Mode
          <>
            <h1>Edit Post</h1>
            <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="postTitle">Title:</label>
              <input
                id='postTitle'
                type='text'
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label htmlFor='postBody'>Post</label>
              <textarea
                id='postBody'
                required
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
              <button type='submit' onClick={() => handleEdit(post.id)} style={{background:'teal'}}>Submit</button>
              
              <button type='button' onClick={() => setIsEditing(false)} style={{background:'teal'}}>Cancel</button>
            </form>
          </>
        ) : (
          // View Mode
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <button className='editButton' onClick={() => setIsEditing(true)}>Edit Post</button>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>Delete Post</button>
          </>
        )
      ) : (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing!</p>
          <p><Link to='/'>Visit Our Homepage</Link></p>
        </>
      )}
    </main>
  );
};

export default PostPage;
