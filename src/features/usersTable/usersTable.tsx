import {User} from "./models/user";
import React from "react";

export function UsersTable({users}: { users: User[] }) {
  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
      </thead>
      <tbody>
      {
        users.map(user => (
          <tr key={user.uniqueId()}>
            <td>{user.getFullName()}</td>
            <td>{user.age}</td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}
