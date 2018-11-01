import React, { Component } from 'react';
import moment from 'moment';
import '../css/repositories.css';

class Repositories extends Component {

  constructor(props){
    super(props);
    this.state= {
      data_repos : {}, // repository data of username
      type : "All",  // it will store repository type - used for filter
      languageArray : [], //it will store all languages used by the user in all his/her repository
      language : "All", // it will store language - used for filter
      searchValue : "", // value holding in searchbar for repository
      repoArray : [], // it will store some filtered repository names based on searchValue of searchbar
      allRepoArray : [] // it will store all repository names
    }
  }

  componentDidMount(){

    // repository API call depending on the username of git
    fetch('https://api.github.com/users/' + this.props.userId + '/repos', {
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
     }).then((data_repos) => {
     this.setState({data_repos},()=>this.createLanguageArray()); // store data of api - repository , callback to function

     }).catch(function(error) {
       console.log(error + "! Server is down");
     });
  }

  updateSearchValue = event => {
      // will trigger onChange of searchbar value
      this.setState({searchValue : event.target.value}); // store the value in the searchbar

      let repoArray = (this.state.allRepoArray).filter(function(item){ // this function will create a filtered list of repo names according to the value in searchbar
        return item.toLowerCase().search(
          event.target.value.toLowerCase()) !== -1;
      });

      this.setState({repoArray}); // storing the filtered repo names - used for filter
  }

  languageSelect = (language) => {

    this.setState({language}); // store language to filter
  }

  createLanguageArray = () => {
    // this will filter null language from some repository, will remove other params and store only language in array and filter duplicate languages.
    let languageArray = this.state.data_repos && this.state.data_repos.length && this.state.data_repos.filter((elem)=>{
      return elem.language ? elem : null   // removing params with language = null
    }).map((elem)=>{
      return elem.language    // taking only language param in array
    }).filter((elem, index, self)=>{
       return index === self.indexOf(elem); // removing duplicate language from array
    });

    if(languageArray !== undefined && typeof(languageArray) === "object") // adding "ALL" param in language list provided array is defined
      languageArray.unshift("All");

    this.setState({languageArray}); // storing the language-array


    this.createRepoArray(); // create array of all repository-names
  }

  createRepoArray = () => {

    let allRepoArray = this.state.data_repos && this.state.data_repos.length && this.state.data_repos.map((elem)=>{
      return elem.name
    });

    this.setState({allRepoArray}); //storing array of all repository-names

  }


  typeSelect = (type) => {
    //console.log(type);
    this.setState({type});
  }

  render() {

    const typeArray = ["All","Sources","Forks","Archived","Mirrors"] // repo names array-list

    return (
      <div className="Repositories">
      <div className="flexDiv">
        <div style={{flexGrow:"13",paddingRight:"25px"}}>
        {/* input field to search repository names */}
        <input className="form-control"
          type= "text"
          autoFocus required
          placeholder = "Find a repository..."
          value = {this.state.searchValue}
          onChange = {this.updateSearchValue}
          />
        </div>
        <div style={{flexShrink:"0"}}>
            <div className="dropdown" style={{paddingRight:"5px"}}>
              <button className="btn btn-default dropdown-toggle filterButton" type="button" data-toggle="dropdown">Language: {this.state.language} <span className="caret"></span></button>
              <ul className="dropdown-menu">
                {
                  this.state.languageArray && this.state.languageArray.map((elem)=>{ // repository language dropdown coming from language-array
                    return (<li key={elem}><a onClick = {() => this.languageSelect(elem)}>{elem}</a></li>)
                  })
                }
              </ul>
            </div>
        </div>
        <div style={{flexShrink:"0"}}>
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle filterButton" type="button" data-toggle="dropdown">Type: {this.state.type} <span className="caret"></span></button>
              <ul className="dropdown-menu">
                {
                  typeArray.map((elem)=>{  // repository type dropdown coming from type-array
                    return (<li key={elem}><a onClick = {() => this.typeSelect(elem)}>{elem}</a></li>)
                  })
                }
              </ul>
            </div>
        </div>
      </div>
      <hr/>
      <div className = "row scrollView">
          {  // it shows what all currently filters are applied by the users

            this.state.type === "All" && this.state.language === "All" && this.state.searchValue === "" ? "" :
            (this.state.searchValue !== "" ? (<div className="col-lg-12 filterPrompt"><h5>{"Result for "}  <i> {this.state.type} </i>{"Repository of language "}<i> {this.state.language} </i>{" with matching "}<i> {this.state.searchValue} </i></h5><hr/></div>) :
             (<div className="col-lg-12 filterPrompt"><h5>{"Result for "}  <i> {this.state.type} </i>{"Repository of language "}<i> {this.state.language} </i></h5><hr/></div>))
          }
          {
            this.state.data_repos && this.state.data_repos.length && this.state.data_repos.filter((elem)=>{
              return  this.state.type === "All" ? // repository-type filter applied
                      elem :
                      (
                        this.state.type === "Sources" ?
                        (elem.fork ? null : elem) :
                        (
                          this.state.type === "Forks" ?
                          (elem.fork ? elem : null) :
                          (
                            this.state.type === "Archived" ?
                            (elem.archived ? elem : null) :
                            (
                              elem.mirror_url ? elem : null
                            )
                          )
                        )
                      )
                    })
                    .filter((elem)=>{ // language filter applied
                      return this.state.language === "All" ? elem : (this.state.language === elem.language ? elem : null)
                    })
                    .filter((elem)=>{ // searchbar VALUE filter on repos
                      return this.state.searchValue ? ( (this.state.repoArray).includes(elem.name) ? elem : null ) : elem
                    })
                    .map((elem) => {  // after language & type filter = the resultant data to display
                        return (  <div key={elem.id} className="col-lg-12">
                          {/* repo name,description */}
                          <h3 className="repoName">{elem.name}</h3>
                          <h5 className="repoDescription">{elem.description}</h5>
                          <div className="flexDiv">
                          {/* repo flex data - forks,updated-at,language etc */}
                            { elem.language ? (<div className="flexDivInner">
                                                <i className="fas fa-circle"></i>{" " + elem.language}
                                                </div>) : ""
                            }
                            { elem.stargazers_count ? (<div className="flexDivInner">
                                                <i className="fas fa-star"></i>{" " + elem.stargazers_count}
                                                </div>) : ""
                            }
                            { elem.forks_count  ? (<div className="flexDivInner">
                                                <i className="fas fa-code-branch"></i>{" " + elem.forks_count}
                                                </div>) : ""
                            }
                            { elem.license ? (<div className="flexDivInner">
                                                <i className="fas fa-balance-scale"></i>{" " + elem.license.name}
                                                </div>) : ""
                            }
                            { elem.updated_at ? (<div className="flexDivInner">
                                                <i className="far fa-clock"></i>{" Updated on " + moment(elem.updated_at).format("DD MMM YYYY")}
                                                </div>) : ""
                            }
                          </div>
                          <hr/>
                      </div>)

            })
          }

      </div>
      </div>
    );
  }
}


export default Repositories;
