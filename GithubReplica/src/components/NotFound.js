import React , { Component } from 'react';
import '../css/notFound.css';
import notfoundImg from '../images/notfound_1.png';


export default class NotFound extends Component{

  render(){
    return(
      <div className="NotFound">
      <div className="error">
        Oops
      </div>
      <div className="error_title">
        The page you are looking for does not exist!!!
      </div>
      <img alt="notFound" src = {notfoundImg} />
    </div>
    );
  }
}
