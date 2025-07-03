import React from "react";

function UserHome(props) {
  return (
    <div>
      <div className="container-main">
        <div className="container-list title" style={{color: "black"}}>
          <h1>{props.el.electionTitle}</h1>
          <br />
          <center style={{ color: "black" ,fontSize:"30px"}}>{props.el.organizationTitle}</center>
          <table
  style={{
    marginTop: "21px",
    borderCollapse: "collapse",
    width: "100%",
    backgroundColor: "#1976D2", // Dark background
    color: "white", // White text
    border: "2px solid white"
  }}
>
  <tr>
    <th style={{ padding: "10px", backgroundColor: "#black", color: "gold" }}>admin</th>
    <td style={{ padding: "10px", color: "black", textTransform: "none", backgroundColor: "white" }}>
      {props.el.adminName} ({props.el.adminTitle})
    </td>
  </tr>
  <tr>
    <th style={{ padding: "10px", backgroundColor: "#black", color: "gold" }}>contact</th>
    <td style={{ padding: "10px", color: "black", textTransform: "none", backgroundColor: "white" }}>
      {props.el.adminEmail}
    </td>
  </tr>
</table>

        </div>
      </div>
    </div>
  );
}
export default UserHome;
