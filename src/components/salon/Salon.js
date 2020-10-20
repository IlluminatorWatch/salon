import React from "react";
import { useParams } from "react-router-dom";
// import { withRouter } from "react-router-dom";

export default function Salon() {
  const { id } = useParams();
  // const { id } = props.match.params;
  // const { id } = this.props.match.params;

  return (
    <div>
      <h5>Salon is where the hair is cut</h5>
      <div>Salon works fine like a scissor</div>
      <div>
        <h1>User id is {id}</h1>  
      </div>
    </div>
  );
}