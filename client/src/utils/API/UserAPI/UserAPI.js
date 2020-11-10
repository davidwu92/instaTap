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

  // add pflink to your profile
  addLink: (token, pfLink) => axios({
    method: 'post',
    url: '/pflinks',
    data: {
      mediaTitle: pfLink.newMediaTitle,
      mediaPlatform: pfLink.newMediaPlatform,
      mediaUrl: pfLink.newMediaUrl
    },
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }),

  // get links from my profile
  getLinks: (token) => axios({
    method: 'get',
    url: '/pflinks',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }),

  // delete pflink from profile
  deleteLink: (token, id) => axios({
    method: 'delete',
    url: '/pflinks',
    data: {
      _id: id
    },
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }),
}

export default UserAPI
