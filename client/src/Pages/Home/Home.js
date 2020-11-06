//Landing Page
import React from 'react'
import { useHistory } from 'react-router-dom'
import './home.css'

const Home = () => {
  const history = useHistory()
  return (
    <>
      <div className="container center-align">
        <h5 className="white-text">FIND CONNECTIONS. CONSOLIDATE PROFILES.</h5>
        <div id="homeCard" className="row">
          <div className="col s12">
            <div className="sp-container">
              <div className="sp-content">
                <div className="sp-globe"></div>
                <h4 className="frame-1">lalalala 1</h4>
                <h4 className="frame-2">lalala 2</h4>
                <h4 className="frame-3">lalala 3</h4>
                <h4 className="frame-4">lalala 4</h4>
                <h4 className="frame-5">
                  <span>Message 1</span>
                  <span>Message 2</span>
                  <span>Message 3</span>
                </h4>
                <div className="sp-circle-link" onClick={()=>{history.push('/login')}}>Let's Go<i className="material-icons">send</i></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home