import React, { useContext, useState } from 'react'
import UserContext from '../../utils/UserContext'
import UserAPI from '../../utils/API/UserAPI'
import { useHistory } from 'react-router-dom'
import './register.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { addUser } = UserAPI

const RegisterForm = () => {
  const history = useHistory()

  const { username, email, phone, password, bio, handleInputChange } = useContext(UserContext)

  //configure error message.
  toast.configure();
  const toastOptions = {
    autoClose: 5000,
    hideProgressBar: true,
    type: "error"
  }

  // ADD USER/REGISTER BUTTON
  const handleAddUser = event => {
    event.preventDefault()
    addUser({
      username, email, phone,
      password: password,
      //other relevant pf info that can be edited from profile.
      links: [],
      pfPic: '',
      profile: '',
      //HARMONIZE INFO
      bio: bio === '' ? `You currently don't have a bio. Click on the edit profile button to tell others about yourself!` : bio,
    })
      .then(({ data }) => {
        console.log(data)
        // need to come back to this for error handling
        if (data === "OK") {
          history.push('/login')
        } else if (data === "password cant be left blank") {
          //Error: Password not long enough/missing.
          return (toast(`You must provide a password.`, toastOptions))
        } else if (data === 'need more') {
          // Error: password not long enough
          return (toast(`Your password must be at least 4 characters long.`, toastOptions))
        } else if (data.e.keyValue.username || null) {
          //Error: username in use.
          return (toast(`That username is already in use.`, toastOptions))
        } else if (data.e.keyValue.email || null) {
          //Error: email in use. 
          return (toast(`That email is already in use.`, toastOptions))
        } else if (data.e.keyValue.phone || null) {
          //Error: email in use. 
          return (toast(`That phone number is already in use.`, toastOptions))
        } else {
          //Default error; most likely never triggers.
          return(toast(`Error: New user registration failed.`, toastOptions))
        }
      })
      .catch(e => console.error(e))
  }

  return (
    <div className="row">
      <form id="registerForm" action="" className="col s12">
        <h3 className="white-text">Register</h3>
        {/* <div id="alertMsg" className="red-text"></div>  USING TOASTS INSTEAD*/}
        <div className="col s12 m6">
          {/* NAME */}
          <div className="input-field">
            <label htmlFor="username"></label>
            <input className="white-text" placeholder="Username" type="text" id="username" name="username" value={username} onChange={handleInputChange} />
          </div>
          {/* EMAIL */}
          <div className="input-field">
            <input className="white-text" placeholder="Email" type="text" id="email" name="email" value={email} onChange={handleInputChange} />
            <label htmlFor="email"></label>
          </div>
          {/* PHONE */}
          <div className="input-field">
            <input className="white-text" placeholder="Phone Number" type="text" id="phone" name="phone" value={phone} onChange={handleInputChange} />
            <label htmlFor="phone"></label>
          </div>
          {/* PASSWORD */}
          <div className="input-field">
            <input className="white-text" placeholder="Password" type="password" id="password" name="password" value={password} onChange={handleInputChange} />
            <label htmlFor="password"></label>
          </div>
          {/* BIO--optional */}
          <div className="input-field">
            <input className="white-text" placeholder="(optional) Bio: Tell us about yourself!" type="text" id="bio" name="bio" value={bio} onChange={handleInputChange} />
            <label htmlFor="bio"></label>
          </div>
        </div>

        <div className="col s12 m6">
          <h3>Other crap</h3>
        </div>

        {/* SUBMIT REGISTRATION BUTTON */}
        <button onClick={handleAddUser} id="register" className="btn black waves-effect waves-light col s12 hoverable" type="submit" name="action">Register
              <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
