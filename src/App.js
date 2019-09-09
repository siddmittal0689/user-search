import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import './App.css';
import { UsersList } from "./components/UsersList";
import { DatePicker } from "./components/DatePicker";
import { SearchUsers } from "./components/SearchUsers";
import { Loader } from "./components/Loader";
import * as userActions from './components/actions';

class App extends  React.Component {
  constructor(props){
    super(props);
    this.state ={
      searchText:'',
      filteredUsers: [],
      startDate: '',
      endDate: ''
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

  componentDidMount = () =>{
    this.props.actions.loadUsers();
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
        textSearchFilter = user.campaignName.toLowerCase().indexOf(
          searchText.toLowerCase()) !== -1;
      }
      if(startDate){
        startDateFilter = new Date(user.startDate) > new Date(startDate);
      }
      if(endDate){
        endDateFilter = new Date(user.endDate) < new Date(endDate);
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

function mapStateToProps(state, ownProps) {
  return {
    users: state.usersCampaign.users,
    showLoader: state.usersCampaign.showLoader
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

