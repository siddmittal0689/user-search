import * as types from './actionTypes';
import moment from "moment";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users };
}

export function showLoader(data) {
  return { type: types.SHOW_LOADER, data };
}
function transformArr(users,campaignArray) {
      var filterArray = campaignArray.filter(item => {
        if(moment(item.endDate) > moment(item.startDate)){
          users.find(user => {
            if(user.id === item.userId){
              item.campaignName = user.name
            }
          })
          if(users.find(user => user.id === item.userId) === undefined){
            item.name = "Unknown User";
          }
          if(moment(item.endDate) >= moment()){
            item.status = "Active";
          } else{
            item.status = "Inactive"
          }
          return true;
        }
       
      });
     return filterArray;
}

export function loadUsers(arr) {
  
    return function (dispatch,getState) {
        dispatch(showLoader(true));
        return fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error),
        )
        .then((json) => {
            dispatch(loadUsersSuccess(transformArr(json,arr)));
            dispatch(showLoader(false));
        },
        );
    };
}