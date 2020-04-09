import React, { Fragment } from "react";
import IUser from "../../Models/IUser";
import "./Users.css";

interface IUsersProps {
  users: IUser[];
}

export default class Users extends React.Component<IUsersProps, {}> {
  render() {
    return (
      <Fragment>
        <h1>Users:</h1>
        <div className="allUsersContainer">
          {this.props.users.map(user => {
            return (
              <div key={user.id} className="userContainer">
                <img
                  alt={user.first_name + " " + user.last_name}
                  src={user.avatar}
                  className="userImage"
                />
                <div className="userInformation">
                  <span className="userName">
                    {user.first_name} {user.last_name}
                  </span>

                  <a className="userEmail" href={`mailto:${user.email}`}>
                    {user.email}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
