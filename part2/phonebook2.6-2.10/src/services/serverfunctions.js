import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const getAllPersons = () => {

    const request = axios.get(baseurl)

    return request.then(res => res.data)

}

const addPerson = (newuser) => {
    
    const request = axios.post(baseurl,newuser)

    return request.then(res => res.data)
}

const deletePerson = async (userid) => {
    const request =  await axios.delete(`${baseurl}/${userid}`)

    return request.then(() => console.log('updated'))

}


const updatePersonNumber = (userlist,userid,newNumber) => {

    // find the persons id from the userlist that we have
    const person = userlist.find(n => n.id === userid)

    // make a new object, containing old information and updated phone number
    const personChange = {...person,number: newNumber}
    


    const request = axios.put(`${baseurl}/${userid}`,personChange)

    return request.then(res => res.data)
}

export {getAllPersons, addPerson, deletePerson, updatePersonNumber}