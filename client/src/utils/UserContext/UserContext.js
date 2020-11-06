import { createContext } from 'react'

const UserContext = createContext({
  username: '',
  email: '',
  phone: '',
  password: '',
  bio: '',
  links: [],
  pfPic: '',
  connections: [],
  // resetPasswordToken: '',
  // resetPasswordExpires: '',
  handleInputChange: () => { },
})

export default UserContext