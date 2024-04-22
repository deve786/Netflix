import axios from 'axios'


//create instance with baseUrl
const instance=axios.create({
    baseURL:'https://api.themoviedb.org/3'
})

export default instance