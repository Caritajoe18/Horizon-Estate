import React from "react";
import Panel from "./Panel";
import { PROPERTY } from "../pages/Home";
interface Props {
  property: PROPERTY[];
}
const Dashboard = ({ property }: Props) => {
  return (
    <div className="p-0 m-0">
      <Panel />
      <div className="rounded shadow-lg bg-white mt-5 mx-10 ">
        <h1 style={{textAlign:"center", color: "#1c1c3e", fontWeight: "800", fontSize: "100"}}>SOLD PROPERTIES</h1>
        <div>
          <table className="table table-secondary pl-5" >
            <thead>
              <tr  >
                <th>Name</th>
                <th>Image</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {property.map((prop) => (
                <tr key={prop._id}>
                  <td>{prop.ownerName}</td>
                  <td>
                    <img src={prop.image} alt="" width="100px" height="100px" />
                  </td>
                  <td>{prop.type}</td>
                  <td>{prop.price}</td>
                  <td>{prop.propertyStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
