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




export {getAll, postBlog} ;