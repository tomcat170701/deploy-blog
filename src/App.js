import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from './api/posts';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

function App() {
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  
  useEffect(()=> {
       const fetchPosts = async()=>{
        try{
          const response = await api.get('/posts');
          setPosts(response.data);
        }catch(err){
          if(err.response){
          //Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          }
          else{
            console.log(`Error: ${err.message}`);
          }
        }
       }

       fetchPosts();
  },[])

  useEffect(()=> {
    const filteredResults = posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())
    || ((post.title).toLowerCase()).includes(search.toLowerCase()))

    setSearchResults(filteredResults.reverse())
  },[posts, search])

  return (
    <div className='App'>
      <BrowserRouter>
        <Header title='Dev Blog' />
        <Nav search={search} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<Home posts={searchResults} />} />
          <Route path='/post' element={<NewPost posts={posts} setPosts={setPosts} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody}/>} />
          <Route path='/post/:id' element={<PostPage posts={posts} setPosts={setPosts} />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

