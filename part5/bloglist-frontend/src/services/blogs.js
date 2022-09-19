import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = (userdata) => {
  const request = axios.get(baseUrl,{"headers": {"Authorization": `Bearer ${userdata.token}`}})
  return request.then(response => response.data)
}




export {getAll} ;