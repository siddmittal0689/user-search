import * as types from './actionTypes';
import configureStore from '../store/configureStore';
import moment from "moment";
const campaignArray = [
  {
    "id": 1,
    "name": "Divavu",
    "startDate": "9/19/2017",
    "endDate": "3/9/2018",
    "Budget": 88377,
    "userId": 3
  },
  {
    "id": 2,
    "name": "Jaxspan",
    "startDate": "11/21/2017",
    "endDate": "2/21/2018",
    "Budget": 608715,
    "userId": 6
  },
  {
    "id": 3,
    "name": "Miboo",
    "startDate": "11/1/2017",
    "endDate": "6/20/2017",
    "Budget": 239507,
    "userId": 7
  },
  {
    "id": 4,
    "name": "Trilith",
    "startDate": "8/25/2017",
    "endDate": "11/30/2017",
    "Budget": 179838,
    "userId": 1
  },
  {
    "id": 5,
    "name": "Layo",
    "startDate": "11/28/2017",
    "endDate": "3/10/2018",
    "Budget": 837850,
    "userId": 9
  },
  {
    "id": 6,
    "name": "Photojam",
    "startDate": "7/25/2017",
    "endDate": "6/23/2017",
    "Budget": 858131,
    "userId": 3
  },
  {
    "id": 7,
    "name": "Blogtag",
    "startDate": "6/27/2017",
    "endDate": "1/15/2018",
    "Budget": 109078,
    "userId": 2
  }
];
export function loadUsersSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users };
}

export function showLoader(data) {
  return { type: types.SHOW_LOADER, data };
}
function transformArr(users) {
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

export function loadUsers() {
  
    return function (dispatch) {
        dispatch(showLoader(true));
        return fetch(`https://jsonplaceholder.typicode.com/users`)
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error),
        )
        .then((json) => {
            dispatch(loadUsersSuccess(transformArr(json)));
            dispatch(showLoader(false));
        },
        );
    };
}