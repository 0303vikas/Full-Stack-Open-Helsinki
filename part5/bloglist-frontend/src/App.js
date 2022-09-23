import { useState, useEffect } from 'react';
import {getAll} from './services/blogs';
import LoginForm from './components/Login';
import BlogsForm from './components/Blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [reRender, setReRender] = useState(false)

  useEffect(() => {
    if(user){
    getAll(user).then(blog => {
      setBlogs(blog.sort((a,b)=> a.likes-b.likes))
       }
       )}    
  }, [user,reRender]) 
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)     
    }
    },[])

  

  return (
    <div>      
      {user?<BlogsForm blogs={blogs} user={user} userlogout={e => setUser(e)} blogUpdate={() => setReRender(!reRender)} />:<LoginForm userlogin={e => setUser(e)} />}
     
     
    </div>
  )
}

export default App
