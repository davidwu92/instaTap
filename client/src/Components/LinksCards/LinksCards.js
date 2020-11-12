import React, { useContext, useEffect } from 'react'
import ProfileContext from '../../utils/ProfileContext'
import './linkCards.css'
import moment from 'moment'

import instagramPng from './thumbnails/instagram.png'
import facebookPng from './thumbnails/facebook.png'
import twitterPng from './thumbnails/twitter.png'
import linkedInPng from './thumbnails/linkedIn.png'
import githubPng from './thumbnails/github.png'

const LinksCards = () => {

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  const { links, deleteVideo } = useContext(ProfileContext)

  let cardActivate = (window.location.href.includes("/myprofile")) ? <span className="activator"><i className="material-icons right white-text">more_vert</i></span> : null
  // useEffect(()=>{
  //   console.log(links)
  // },[links])

  const mediaThumbnail = (platform)=>{
    switch(platform){
      case "instagram":
        return instagramPng;
      case "facebook":
        return facebookPng;
      case "twitter":
        return twitterPng;
      case "linkedIn":
        return linkedInPng;
      case "github":
        return githubPng;
      default:
        return '';
    }
  }
  return (
    <div>
      {
        links.map(link => link.map(linkData => {
          let mediaPlatform = linkData.mediaPlatform
          let mediaTitle = linkData.mediaTitle
          let mediaUrl = linkData.mediaUrl
          // let datePosted = moment(ylink.createdAt).format("MMMM Do YYYY, h:mm:ss a")
          return (
            <div className="col s6 m4 l3">
              <div id="post" className="card black hoverable z-depth-5">
                <div className="left-align">
                  {/* David's adding title and body: NEEDS STYLING */}
                  <h5 className="white-text" style={{margin: '0.5rem 0 0.6rem 0.6rem'}}>{mediaTitle} {cardActivate}</h5>
                  {/* <h6 className="grey-text">{mediaUrl}</h6> */}
                </div>
                <div className="card-img">
                  <a href={mediaUrl} target="_blank">
                    <img className="card-img-pic" src={mediaThumbnail(mediaPlatform)} />
                  </a>
                </div>
                {/* <div className="card-action">
                  <span className="grey-text lighten-5">{mediaUsername}</span>
                  <br></br>
                </div> */}
                <div id="cardReveal" className="card-reveal">
                  <span className="card-title grey-text text-darken-4"><i className="material-icons white-text right">close</i></span>
                  <br></br>
                  <h6 className="center-align">Would you like to delete link from your profile?</h6>
                  <h6 className="center-align">This action cannot be undone.</h6>
                  <button id="delPost" className="btn waves-effect waves-light black col s12 white-text" href="#" onClick={() => deleteVideo(token, linkData._id)}>Delete</button>
                </div>
              </div>
            </div>
          )
        }).reverse()
        )
      }
    </div>

  )
}
export default LinksCards