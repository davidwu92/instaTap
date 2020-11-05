import React, { useState } from 'react'
import ReactDOM from 'react-dom';
// Using Pages
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import App from './App';
import './App.css'

import Navbar from './Components/Navbar'
import LoggedinNav from './Components/LoggedinNav'

import Login from './Pages/Login'
import Register from './Pages/Register'

import MyProfile from './Pages/MyProfile'
// import OtherProfile from './Pages/OtherProfile'

import UserContext from './utils/UserContext'

function App() {
  const [userState, setUserState] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  })
  // // Working handleInputchange: call for any Text-Input field.
  // userState.handleInputChange = (event) => {
  //   setUserState({ ...userState, [event.target.name]: event.target.value })
  // }

  // //setting cityState
  // userState.setCityState = (value) => {
  //   setUserState({ ...userState, cityState: value })
  // }


  return (
    <UserContext.Provider value={userState}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Home />
          </Route>

          <Route path="/login">
            <Navbar />
            <Login />
          </Route>

          <Route path="/register">
            <Navbar />
            <Register />
          </Route>

          <Route path="/myprofile">
            <LoggedinNav />
            <MyProfile />
          </Route>

          {/* <Route path="/search">
            <LoggedinNav />
            <Search />
          </Route> */}

          {/* <Route path="/otherprofile">
            <LoggedinNav />
            <OtherProfile />
          </Route> */}

          {/* <Route path="/forgotPassword">
            <ForgotLogin />
          </Route> */}

          {/* <Route path="/reset/:token">
            <ResetPass />
          </Route> */}

          {/* <Route path="/friends">
            <LoggedinNav />
            <FriendsList />
            <FriendsView />
          </Route> */}

          {/* <Route path="/list">
            <LoggedinNav />
            <FriendsView />
          </Route> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App