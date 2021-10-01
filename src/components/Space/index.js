import React from "react";
import { useDispatch } from "react-redux";
import { deleteStory } from "../../store/user/actions";
import Button from "react-bootstrap/Button";

export default function Space(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.content}</p>
      <img
        src={props.imageUrl}
        alt={props.name}
        style={{
          display: "block",
          maxWidth: "100%",
        }}
      />
      <Button onClick={() => dispatch(deleteStory(props.id))}>
        Delete this story
      </Button>
    </div>
  );
}
