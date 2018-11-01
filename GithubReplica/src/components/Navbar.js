import React, { Component } from "react";
import '../css/navbar.css';
import gitimg from '../images/git_img.png';
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        {/* BS navbar used */}
        <div className="container-fluid">

          {/* On resize, navbar options converts to dropdown */}
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href=""><img src={gitimg} alt="Brand Name" style={{maxWidth: "100%",maxHeight: "100%", background:"rgba(255,255,255)"}} className="img-responsive"/></a>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            {/* navbar search */}
            <form className="navbar-form navbar-left">
              <div className="input-group">
                <input type="text" className="form-control nav-searchbar" placeholder="Search or jump to..." name="search"/>
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit">
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
            </form>

            {/* navbar buttons-left */}
            <ul className="nav navbar-nav">
              <li><a href="">Pull Requests</a></li>
              <li><a href="">Issues</a></li>
              <li><a href="">Marketplace</a></li>
              <li><a href="">Explore</a></li>
            </ul>

            {/* navbar buttons-right */}
            <ul className="nav navbar-nav navbar-right">
              <li><a href=""><span className="glyphicon glyphicon-bell"></span></a></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href=""><span className="glyphicon glyphicon-plus"></span><span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">New Repository</a></li>
                  <li><a href="">Import Repository</a></li>
                  <li><a href="">New Gist</a></li>
                  <li><a href="">New Organization</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href=""><img src="https://avatars0.githubusercontent.com/u/13981415?v=4" alt="Brand Name" style={{width: "20px",height: "20px"}} className="img-rounded"/><span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">Signed in as <br/>hereisethanhunt</a></li>
                  <li className="divider"></li>
                  <li><a href="">Your profile</a></li>
                  <li><a href="">Your repositories</a></li>
                  <li><a href="">Your stars</a></li>
                  <li><a href="">Your gists</a></li>
                  <li className="divider"></li>
                  <li><a href="">Help</a></li>
                  <li><a href="">Settings</a></li>
                  <li><a href="">Sign out</a></li>
                </ul>
              </li>
            </ul>

          </div>

        </div>
        {/* BS navbar used */}
      </nav>
    );
  }
}


export default (Navbar);
