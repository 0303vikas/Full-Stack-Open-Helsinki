import { useState, useEffect } from 'react';
import {getAll} from './services/blogs';
import LoginForm from './components/Login';
import BlogsForm from './components/Blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    if(user){
    getAll(user).then(blog => {
      setBlogs(blog)
       })
    }
    
  }, [user])  

  return (
    <div>      
      {user?<BlogsForm blogs={blogs} username={user.username} />:<LoginForm userlogin={e => setUser(e)} />}
     
     
    </div>
  )
}

export default App
