import axios from 'axios';
const baseUrl = '/api/persons/';

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => {
        return response.data
    })
}

const create = (newObject) =>{
    const post = axios.post(baseUrl, newObject)
    return post.then(response => {
        return response.data
    })
}

const remove = (id) =>{
    const dataUrl = baseUrl.concat(id)
    const remove = axios.delete(dataUrl)
    return remove.then(response =>{
        return response
    })
}
const update = (id, updatedObject) => {
    const url = baseUrl.concat(id)
    const update = axios.put(url, updatedObject)
    return update.then(response => {
        return response
    })
    
}
export default {
    getAll,
    create,
    remove,
    update
}