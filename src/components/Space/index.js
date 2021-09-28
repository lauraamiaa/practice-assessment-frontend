import React from "react";
import { useDispatch } from "react-redux";
import { deleteStory } from "../../store/user/actions";

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
      <button onClick={() => dispatch(deleteStory(props.id))}>
        Delte this story
      </button>
    </div>
  );
}
