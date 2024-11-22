import React from "react";

interface UserData {
  name: string;
  votes: number;
  join: Date;
}

interface UserTableProps {
  userdata: UserData[];
}
const UserTable: React.FC<UserTableProps> = ({ userdata }) => {
  return (
    <table>
      <tr>
        <th>Name</th>
        <th>Votes</th>
        <th>Joining Date</th>
      </tr>
      {userdata.map((data, index) => (
        <tr key={index}>
          <td>{data.name}</td>
          <td>{data.votes}</td>
          <td>
            {data.join.getDate()}-{data.join.getMonth()}-{data.join.getFullYear()}
          </td>
        </tr>
      ))}
    </table>
  );
};
export default React.memo(UserTable);
