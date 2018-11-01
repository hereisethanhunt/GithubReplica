import React, { Component } from 'react';
import '../css/dashboard.css';
import Navbar from './Navbar';
import Repositories from './Repositories';

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state= {
      data_history : {} // this will store the user-api-response
    }
  }

  componentDidMount(){

    // User api request and stored
    fetch('https://api.github.com/users/' + this.props.match.params.userId, {
       method: 'get',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
       }
     }).then(function(response) {
       console.log(response);
       if(response.status === 200)
         return response.json();
       else
         return {};

     }).then((data_history) => {

     this.setState({data_history}); // user-api response stored

     }).catch(function(error) {
       console.log(error + "! Server is down");
     });
  }

  render() {

    return (
      <div className="Dashboard">
        <Navbar/>

        <div className="FormDiv container">
          <div className = "row">
            <div className="col-lg-3 col-mg-3 col-sm-3">

              {/* user image based on userid entered in URL */}
              <div className="col-lg-12 remove-padding">
                {
                  this.state.data_history && this.state.data_history.avatar_url ? <img src= {this.state.data_history.avatar_url} alt="Brand Name" style={{maxWidth: "100%",maxHeight: "100%"}} className="img-rounded"/> : ""
                }
              </div>
              {/* user NAME based on userid entered in URL */}
              <div className="col-lg-12 name-title">
              {
                this.state.data_history && this.state.data_history.name ? this.state.data_history.name : ""
              }
              </div>
              {/* user LOGIN DATA based on userid entered in URL */}
              <div className="col-lg-12 username-title">
              {
                this.state.data_history && this.state.data_history.login ? this.state.data_history.login : ""
              }
              </div>
              {/* user bio based on userid entered in URL */}
              <div className="col-lg-12 description-title">
              {
                this.state.data_history && this.state.data_history.bio ? this.state.data_history.bio : ""
              }
              </div>

              <div className="col-lg-12" style={{padding:"0px"}}>
                <hr style={{marginTop:"15px",marginBottom:"10px"}}/>
              </div>
              {/* Left side data - showing company-name, email-id and location */}
              {
                this.state.data_history && this.state.data_history.company ? <div className="col-lg-12 description-title"><i className="fas fa-users" style={{width:"20px"}}></i>{this.state.data_history.company}</div>  : ""
              }

              {
                this.state.data_history && this.state.data_history.location ? <div className="col-lg-12 description-title"><i className="fas fa-map-marker-alt" style={{width:"20px"}}></i>{this.state.data_history.location}</div>  : ""
              }

              {
                this.state.data_history && this.state.data_history.email ? <div className="col-lg-12 description-title"><i className="fas fa-envelope" style={{width:"20px"}}></i>{this.state.data_history.email}</div>  : ""
              }

            </div>
            <div className="col-lg-9 col-mg-9 col-sm-9">
                {/* BS tabs */}
                <ul className="nav nav-tabs">
                  <li><a data-toggle="tab" href="#menu0">Overview</a></li>
                  <li className="active"><a data-toggle="tab" href="#menu1">Repositories</a></li>
                  <li><a data-toggle="tab" href="#menu2">Stars</a></li>
                  <li><a data-toggle="tab" href="#menu3">Followers</a></li>
                  <li><a data-toggle="tab" href="#menu4">Followings</a></li>
                </ul>

                <div className="tab-content">
                  {/* Overview Component- not made */}
                  <div id="menu0" className="tab-pane fade">
                    <h3>Under Construction</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  {/* Repositories Component */}
                  <div id="menu1" className="tab-pane fade in active">
                    <Repositories userId={ this.props.match.params.userId }/>
                  </div>
                  {/* Stars Component- not made */}
                  <div id="menu2" className="tab-pane fade">
                    <h3>Under Construction</h3>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                  </div>
                  {/* Followers Component- not made */}
                  <div id="menu3" className="tab-pane fade">
                    <h3>Under Construction</h3>
                    <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                  </div>
                  {/* Followings Component- not made */}
                  <div id="menu4" className="tab-pane fade">
                    <h3>Under Construction</h3>
                    <p>veritatis et quasi architecto beatae vitae dicta sunt explicabo adipisicing elit,</p>
                  </div>

                </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}


export default Dashboard;
