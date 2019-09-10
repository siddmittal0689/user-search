import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './App.css';
import { UsersList } from "./components/UsersList";
import { DatePicker } from "./components/DatePicker";
import { SearchUsers } from "./components/SearchUsers";
import { Loader } from "./components/Loader";
import * as userActions from './actions';
import moment from "moment";

class App extends  React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchText:'',
      filteredUsers: [],
      startDate: '',
      endDate: '',
      newCampaignArray: [],
    }
  }
  

 componentWillReceiveProps(nextProps){
  const {users}  = this.props;
  if(nextProps.users !==users){
    this.setState({
      filteredUsers: nextProps.users,
    });
  }
 }

 updateCampaignArray = (arr) => {
  this.setState({newCampaignArray : arr});
 }

  componentDidMount = () =>{
    const {defaultCampaignArray} =  this.props
    this.props.actions.loadUsers(defaultCampaignArray);
    const that = this;
    window.AddCampaigns = function(arr){
     if(Array.isArray(arr)){
      that.updateCampaignArray([...defaultCampaignArray,...arr]);
     } else {
       console.log("AddCampaigns method accepts only array");
     }
   }
  }

  componentDidUpdate = (prevProps,prevState) => {
    if(prevState.newCampaignArray !== this.state.newCampaignArray){
      this.props.actions.loadUsers(this.state.newCampaignArray);
    }
  }

  onTextSearch = (e) =>{
    this.setState({
      searchText: e.target.value,
    });
  }

  setStartDate = (e) =>{
    this.setState({
      startDate: e.target.value,
    });
  }
  
  setEndDate = (e) =>{
    this.setState({
      endDate: e.target.value,
    });
  }

  updateHandler = () =>{
    const {users}  = this.props;
    const {startDate, endDate, searchText}  = this.state;
    const filteredUsers = users.filter(user => {
      let textSearchFilter = true;
      let startDateFilter = true;
      let endDateFilter = true;
      if(searchText){
        textSearchFilter = user.name.toLowerCase().indexOf(
          searchText.toLowerCase()) !== -1;
      }
      if(startDate){
        startDateFilter = moment(user.startDate) > moment(startDate);
      }
      if(endDate){
        endDateFilter = moment(user.endDate) < moment(endDate);
      }
      return textSearchFilter && startDateFilter && endDateFilter;
      
    });
    this.setState({
      filteredUsers: filteredUsers,
    });
  }

  render(){
    return (
      <div className="App container" >     
        {this.props.showLoader ?
          <Loader/> :
          <>
          <div className="row search-area">
            <DatePicker
              setStartDate={this.setStartDate}
              setEndDate={this.setEndDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              />
              <SearchUsers 
                onTextSearch= {this.onTextSearch}
                searchText ={this.state.searchText}
                updateHandler={this.updateHandler}
              />
          </div>
          
          <UsersList 
            campaignArray = {this.state.filteredUsers}
          />
          </>
        }
      </div>
    );
  }
 
}

function mapStateToProps(state) {
  return {
    users: state.usersCampaign.users,
    showLoader: state.usersCampaign.showLoader,
    defaultCampaignArray: state.usersCampaign.defaultCampaignArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

