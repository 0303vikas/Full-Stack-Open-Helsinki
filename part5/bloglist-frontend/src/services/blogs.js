import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (userdata) => {
  const request = await axios.get(baseUrl,{"headers": {"Authorization": `Bearer ${userdata.token}`}})
  return request.data
}

const postBlog = async (userdata,blogData) => {

  const request = await axios.post(baseUrl,blogData,{
      headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${userdata.token}`
    }
  })
  return request.data
}

const addLikes = async (blogId,blogData,usertoken) => {
  
  const request = await axios.put(baseUrl+`/${blogId}`,blogData,{"headers": {"Authorization": `Bearer ${usertoken}`}})
  return request.data
}

const deleteBlog = async (blogId,usertoken) => {

  const  request = await axios.delete(baseUrl+`/${blogId}`,{"headers": {"Authorization": `Bearer ${usertoken}`}})
  return request.data
}




export {getAll, postBlog, addLikes, deleteBlog} ;