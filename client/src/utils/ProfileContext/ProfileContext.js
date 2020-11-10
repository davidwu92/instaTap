import { createContext } from 'react'

const ProfileContext = createContext({
  links: [],
  // friends: [],
  deleteMedia: () => {}
})

export default ProfileContext