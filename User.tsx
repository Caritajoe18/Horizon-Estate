import React from "react";



export interface Post {
  getUsers: USERS[];
}

interface USERS {
  _id: string;
  fullName: string;
  email: string;
  createdAt: Date;
}

const viewUsers = ({property}: Props) => {
  const [user, setUser] = useState<USERS[]>([]);
  return (
    
    <div>
      <h1 style={{textAlign:"center", color: "#1c1c3e", fontWeight: "800", fontSize: "100"}}>ALL USERS</h1>
       
      <table className="table table-primary">
        <thead >
          <tr>
            <th>User ID</th>
            <th>Fullname</th>
            <th>Email</th>
            <th>Registered date</th>

          </tr>
        </thead>
        <tbody>
          {property.map((prop) => (
            <tr key={prop._id}>
              <td>{prop.fullName}</td>
              <td>{prop.email}</td>
              <td>{prop.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default viewUsers;
