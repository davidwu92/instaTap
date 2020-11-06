import axios from 'axios'

const UserAPI = {
  //to get info on logged-in user.
  getUser: (token) => axios.get('/users', {
      headers: {
        "Authorization": "Bearer " + token}
    }),
    
  //edit profile
  updateUser: (id, values) => axios.put(`/users/${id}`, values),
  
  //Register new user
  addUser: (user) => axios.post('/users', user),
  
  //delete user.
  deleteUser: (id) => axios.delete(`/users/${id}`),
  
  //login existing user.
  loginUser: (user) => axios.post('/login', user),

  // get all request
  getRequest: (id) => axios.get(`/request/${id}`),
}

export default UserAPI
