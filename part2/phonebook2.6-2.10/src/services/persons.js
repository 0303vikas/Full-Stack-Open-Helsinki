import axios from 'axios'
const baseurl = 'api/persons'

const getAllPersons = () => {

    const request = axios.get(baseurl)
    return request.then(res => res.data)
}

const addPerson = (newuser) => {
    
    const request = axios.post(baseurl,newuser)
    return request.then(res => res.data)
}

const deletePerson =  (userid) => {

    const request =   axios.delete(`${baseurl}/${userid}`)
    return request.then(() => console.log('Deleted'))
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