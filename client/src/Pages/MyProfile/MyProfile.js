import React, { useState, useEffect } from 'react'
import UserAPI from '../../utils/UserAPI'
// import ProfileContext from '../../utils/ProfileContext'
import './myProfile.css'
import {
  Modal,
  Button,
  TextInput
} from 'react-materialize'
import UserAPI from '../../utils/API/UserAPI'
// import default_profile from '../../default_profile.jpg'

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import axios from 'axios'

const { getUser, updateUser } = UserAPI

const MyProfile = () => {
  const [profileState, setProfileState] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
    links: [],
    pfPic: '',
    connections: [],
  })

  return (
    <>
      <div className="container">
        <h1> My Profile </h1>
      </div>
    </>
  )
}


export default MyProfile