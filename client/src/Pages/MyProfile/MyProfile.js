import React, { useState, useEffect } from 'react'
// import ProfileContext from '../../utils/ProfileContext'
import './myProfile.css'
import {
  Modal,
  Button,
  TextInput
} from 'react-materialize'
import UserAPI from '../../utils/API/UserAPI'
import LinksCards from '../../Components/LinksCards'
import ProfileContext from '../../utils/ProfileContext'

// import default_profile from '../../default_profile.jpg'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import default_profile from '../../default_profile.jpg';
import axios from 'axios';

const { getUser, updateUser, addLink, getLinks, deleteLink } = UserAPI

const MyProfile = () => {
  const [profileState, setProfileState] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
    links: [],
    id: '',
    pfPic: '',
    profile: '',
    // connections: [],
  })

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  //using token to grab MY user data.
  useEffect(() => {
    getUser(token)
      .then(({ data }) => {
        localStorage.setItem('userId', data._id)
        setProfileState({
          ...profileState,
          username: data.username,
          email: data.email,
          phone: data.phone,
          bio: data.bio,
          links: data.links,
          pfPic: data.pfPic,
          //for put requests later...
          id: data._id,
          // pfPic: data.pfPic,
          connections: data.connections,
          // request: data.request,
          // pending: data.pending
        })
      })
      .catch((e) => console.error(e))

  }, [])

  
  //Setting up editState VARIABLES: Allows us to edit values before submitting PUT requests to db
  const [editState, setEditState] = useState({
    //basic info
    username: '', email: '', phone: '', bio: '', profile: '', pfPic: '', links: '',
    //new post info
    newMediaTitle: '', newMediaPlatform: '', newMediaUrl: ''
  })

  //handles input changes for EDITING FORMS on this page.
  editState.handleInputChange = (event) => {
    setEditState({ ...editState, [event.target.name]: event.target.value })
  }

  // profilePicture Ternary
  const profilePicture = (profileState.pfPic) ? profileState.pfPic : default_profile
  //edit pf picture
  const editPicture = (event) => {
    event.preventDefault()
    const file = document.getElementById('inputGroupFile01').files
    const formData = new FormData()

    formData.append('img', file[0])
    //Any empty fields in editState will PUT old profile information.
    let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
    document.getElementById('img').setAttribute('src', `http://localhost:3000/${file[0].name}`)
    axios({
      method: 'post',
      url: '/',
      data: formData,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(({ data }) => {

        let profile = JSON.parse(JSON.stringify(file[0].name))
        setProfileState({ ...profileState, profile })
      })
    updateUser(profileState.id, {
      profile: file[0].name
    })
      .then(() => {
        console.log("You edited the profile.")
      })
      .catch(e => console.error(e))
  }

  //~~~~~~~~~~ADDING LINKS STUFF~~~~~~~~~
  const [pfLinkState, setPfLinkState] = useState({
    links: []
  })

  // on page load, show links?
  useEffect(() => {
    getLinks(token)
      .then(({ data }) => {
        console.log(data)
        let links = []
        links.push(data)
        setPfLinkState({ ...pfLinkState, links })
      })
      .catch(e => console.error(e))
  }, [])

  //configure error messages for addLlink.
  toast.configure();
  const toastOptions = { autoClose: 7000, hideProgressBar: true, type: "error" }
  
  //Add a profile link button
  const createPost = <button id="editBtn" className="waves-effect waves-light center-align white-text col s12">Create a post</button>;

  const mediaPlatformSelect = ()=>{
    setEditState({
      ...editState, newMediaPlatform: document.getElementById('mediaPlatformMenu').value
    })
  }
  //EDITING PROFILE: FORM SUBMISSION
  const editPfButton = <button id="editBtn" className="waves-effect waves-light right white-text col s12"><i id="editBtnIcon" className="fas fa-user-edit"></i></button>
  
  //Edit PF form submission
  const editProfile = (event) => {
    event.preventDefault()
    //Any empty fields in editState will PUT old profile information.
    updateUser(profileState.id, {
      username: (editState.username === "") ? profileState.username : editState.username,
      email: (editState.email === "") ? profileState.email : editState.email,
      phone: (editState.phone === "") ? profileState.phone : editState.phone,
      bio: (editState.bio === "") ? profileState.bio : editState.bio,
      links: (editState.links === "") ? profileState.links: editState.links,
      pfPic: (editState.pfPic === "") ? profileState.pfPic : editState.pfPic,
      profile: (editState.profile === '') ? profileState.profile : editState.profile
    })
      .then(() => {
        getUser(token)
          .then(({ data }) => {
            setProfileState({
              ...profileState,
              username: data.username,
              email: data.email,
              phone: data.phone,
              bio: data.bio,
              links: data.links,
              pfPic: data.pfPic,
              profile: data.profile,
              id: data._id,
            })
          })
          .catch((e) => console.error(e))
        console.log("You edited the profile.")
      })
      .catch(e => console.error(e))
  }
  

  // email link variable
  let email = "mailto:" + profileState.email


  // ADD EMBEDDING LINK
  const addMedia = (event) => {
    event.preventDefault()
    let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
    let mediaPost = { newMediaTitle: editState.newMediaTitle,
                      newMediaPlatform: editState.newMediaPlatform,
                      newMediaUrl: editState.newMediaUrl }
    if (mediaPost.newMediaTitle) {
      if ( mediaPost.newMediaPlatform && mediaPost.newMediaUrl) { //Check for validity here?
        addLink(token, mediaPost)
          .then(() => {
            setEditState({ ...editState, newMediaTitle: '', newMediaPlatform: '', newMediaUrl: '' })
            getLinks(token)
              .then(({ data }) => {
                let links = []
                links.push(data)
                setPfLinkState({ ...pfLinkState, links })
              })
              .catch(e => console.error(e))
          })
          .catch(e => console.error(e))
      } else {
        setEditState({ ...editState, newMediaLink: '', newMediaPlatform: '' })
        return (toast(`Make sure you select a platform and provide a valid URL to your profile.`, toastOptions))
      }
    } else {
      setEditState({ ...editState, newMediaTitle: '' })
      return (toast(`Please provide a title for your post.`, toastOptions))
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {/* PROFILE PIC */}
          <div className="col s4 m2 center">            
            
            <img id="img" className="circle responsive-img" alt="Your profile picture" src={profilePicture} />

            {/* EDIT PROF PIC */}
            <Modal id="edProfModal" className="center-align"
              actions={[
                <Button flat modal="close" node="button" className="waves-effect waves-light hoverable" id="editBtn">
                  Close
                </Button>,
                <span> </span>,
                <Button onClick={editPicture} modal="close" node="button" className="waves-effect waves-light hoverable" id="editBtn">
                  Upload <i className="material-icons right">send</i>
                </Button>
              ]}
              header="Edit Your Profile Picture" trigger={editPfButton}>
              <form action="#">
                <div className="file-field input-field">
                  <div className="btn black">
                    <span>File</span>
                    <input type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    ></input>
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                  </div>
                </div>
              </form>
            </Modal>
          </div>

          {/* BASIC INFO */}
          <div className="col s8 m3">
            {/* USERNAME */}
            <h4 className="white-text">{profileState.username}</h4>
            {/* EMAIL */}
            <h6><a href={email}>{profileState.email}</a></h6>
            {/* BIO */}
            <h6 className="grey-text">{profileState.bio}</h6>
          
            {/* EDIT PROFILE MODAL  */}
            <Modal id="edProfModal" className="center-align"
              actions={[
                <Button flat modal="close" node="button" className="waves-effect waves-light" id="editBtn" >
                  Close
                </Button>,
                <span>  </span>,
                <Button onClick={editProfile} flat modal="close" node="button" className="waves-effect waves-light" id="editBtn">
                  Save Changes
                </Button>
              ]}
              header="Edit Profile"
              options={{
                dismissible: true, endingTop: '10%', inDuration: 250, onCloseEnd: null,
                onCloseStart: null, onOpenEnd: null, onOpenStart: null, opacity: 0.5,
                outDuration: 250, preventScrolling: true, startingTop: '4%'
              }}
              trigger={editPfButton}
            >
              <form>
                <span>Username</span>
                <TextInput placeholder={profileState.username} type="newUsername" id="newUsername" name="username" value={editState.username} onChange={editState.handleInputChange} />
                <span>Email</span>
                <TextInput placeholder={profileState.email} type="newEmail" id="newEmail" name="email" value={editState.email} onChange={editState.handleInputChange} />
                <span>Bio</span>
                <TextInput placeholder={profileState.bio} type="newBio" id="newBio" name="bio" value={editState.bio} onChange={editState.handleInputChange} />
              </form>
            </Modal>
          </div>

        </div>

        <div className="divider grey"></div>

        <div className="container">
          {/* POST LINK. NEEDS TO BE EDITED. */}
          <div className="row center-align">
            <div className="row"></div>
            {/* CREATEPOST MODAL BUTTON (commented out for now) */}
            <Modal id="edProfModal" className="center-align"
              actions={[
                <Button flat modal="close" node="button" className="waves-effect waves-light" id="editBtn" >
                  Close
                </Button>,
                <span>  </span>,
                <Button onClick={addMedia} flat modal="close" node="button" className="waves-effect waves-light" id="editBtn">
                  Submit
                </Button>
              ]}
              header="Add a profile link"
              options={{
                dismissible: true, endingTop: '10%', inDuration: 250, onCloseEnd: null,
                onCloseStart: null, onOpenEnd: null, onOpenStart: null, opacity: 0.5,
                outDuration: 250, preventScrolling: true, startingTop: '4%'
              }}
              trigger={createPost}
            >
            
              {/* EMBED LINK FORM */}
              <form action="#">
                <h6 className="grey-text">Add a profile link</h6>
                <TextInput placeholder="Title (required)" type="newMediaTitle" id="newMediaTitle" name="newMediaTitle" value={editState.newMediaTitle} onChange={editState.handleInputChange} />
                <TextInput placeholder="URL (required)" type="newMediaUrl" id="newMediaUrl" name="newMediaUrl" value={editState.newMediaUrl} onChange={editState.handleInputChange} />
                {/* Choose type of post */}
                <select
                    id="mediaPlatformMenu"
                    className="browser-default"
                    options={{
                      classes: '', dropdownOptions: {
                        alignment: 'left',
                        autoTrigger: true, closeOnClick: true, constrainWidth: true,
                        container: null, coverTrigger: true, hover: false,
                        inDuration: 150, onCloseEnd: null, onCloseStart: null,
                        onOpenEnd: null, onOpenStart: null, outDuration: 250
                      }
                    }}
                    onChange={mediaPlatformSelect}
                  >
                    {/* <option value="0" selected>Select Type</option> */}
                    <option value="linkedIn" selected>LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="snapchat">Snapchat</option>
                </select>
              </form>
            </Modal> {/* -KEEP THIS FOR ADDLINK MODAL */}
          </div>
        </div>

        {/* MY PROFILE-LINKS */}
        <div className="row">
          <ProfileContext.Provider value={pfLinkState}>
            <LinksCards />
          </ProfileContext.Provider>
        </div>

      </div>
    </>
  )
}


export default MyProfile