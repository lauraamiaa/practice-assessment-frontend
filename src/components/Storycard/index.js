import React from "react";

export default function index(props) {
  return (
    <div>
      <h2>
        <strong>{props.name}</strong>
      </h2>
      <p>{props.content}</p>
      <img
        src={props.imageUrl}
        alt={props.name}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
