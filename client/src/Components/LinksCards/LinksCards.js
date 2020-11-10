import React, { useContext, useEffect } from 'react'
import ProfileContext from '../../utils/ProfileContext'
import './linkCards.css'
import moment from 'moment'


const LinksCards = () => {

  let token = JSON.parse(JSON.stringify(localStorage.getItem("token")))
  const { links, deleteVideo } = useContext(ProfileContext)

  let cardActivate = (window.location.href.includes("/myprofile")) ? <span className="activator"><i className="material-icons right white-text">more_vert</i></span> : null
  // useEffect(()=>{
  //   console.log(links)
  // },[links])

  const mediaThumbnail = (platform)=>{
    //NEED THUMBNAILS AND SWITCH CASE
    return("some image url here")
  }
  return (
    <div>
      {
        links.map(link => link.map(ylink => {
          let mediaPlatform = ylink.mediaPlatform
          let mediaTitle = ylink.mediaTitle
          let mediaUrl = ylink.mediaUrl
          // let datePosted = moment(ylink.createdAt).format("MMMM Do YYYY, h:mm:ss a")
          return (
            <div className="col s12 m6 l4">
              <div id="post" className="card black hoverable z-depth-5">
                <div className="center-align">
                  {/* David's adding title and body: NEEDS STYLING */}
                  <h5 className="white-text">{mediaTitle}</h5>
                  {/* <h6 className="grey-text">{mediaUrl}</h6> */}
                </div>
                <div className="card-img">
                  <a href={mediaUrl} target="_blank"><img className="card-img-pic" src={mediaThumbnail(mediaPlatform)} /></a>
                </div>
                <div className="card-action">
                  {/* <span className="grey-text lighten-5">{datePosted}</span> */}
                  {cardActivate}
                  <br></br>
                </div>
                <div id="cardReveal" className="card-reveal">
                  <span className="card-title grey-text text-darken-4"><i className="material-icons white-text right">close</i></span>
                  <br></br>
                  <h5 className="center-align">Would you like to delete this from your profile?</h5>
                  <button id="delPost" className="btn waves-effect waves-light black col s12 white-text" href="#" onClick={() => deleteVideo(token, ylink._id)}>Delete</button>
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