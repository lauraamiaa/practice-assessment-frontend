import React from "react";
import { Link } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";

export default function Spacecard(props) {
  return (
    <Jumbotron
      style={{
        backgroundColor: props.backgroundColor,
        color: props.color,
      }}
    >
      <h2>
        <strong>{props.title}</strong>
      </h2>
      <p>{props.description}</p>
      <Link to={`/spaces/${props.id}`}>
        {" "}
        <button>Visit space</button>{" "}
      </Link>
    </Jumbotron>
  );
}
