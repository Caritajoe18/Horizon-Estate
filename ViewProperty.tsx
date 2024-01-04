import React from "react";
import { PROPERTY } from "../pages/Home";
interface Props {
  property: PROPERTY[];
}

const ViewProperty = ({ property }: Props) => {
  return (
    
    <div>
      <h1 style={{textAlign:"center", color: "#1c1c3e", fontWeight: "800", fontSize: "100"}}>ALL PROPERTIES</h1>
       
      <table className="table table-secondary">
        <thead >
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>OwnerName</th>
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
              <td>{prop.ownerName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProperty;
