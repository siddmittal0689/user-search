import React from "react";
import millify from "millify";
export function UsersList(props) {
  return (
    <div id="users-list">
        <table className="table table-bordered table-hover">
            <thead>
                <tr className="info">
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Active</th>
                    <th>Budget</th>
                </tr>
            </thead>
            <tbody>
            { props.campaignArray.length ? props.campaignArray.map(user =>(
                <tr key={user.name}>
                    <td>{user.name}</td>
                    <td>{user.campaignName}</td>
                    <td>{user.startDate}</td>
                    <td>{user.endDate}</td>
                    <td>
                        <i className={`glyphicon glyphicon-record ${user.status}`}></i> {user.status}
                    </td>
                    <td>{millify(user.Budget)} USD</td>
                </tr>)) :
                <tr>
                    <td colSpan="6">
                        No Data Found
                    </td>
                </tr>
            }
            </tbody>
        </table>
     
    </div>
  );
}