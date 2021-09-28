import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { selectUser } from "../../store/user/selectors";
import Space from "../../components/Space";

export default function MySpace() {
  const { space } = useSelector(selectUser);

  return (
    <div>
      {!space ? (
        "You have no own space yet"
      ) : (
        <Container
          style={{
            backgroundColor: space.backgroundColor,
            color: space.color,
          }}
        >
          <h2>
            <strong>{space.title}</strong>
          </h2>
          <p>{space.description}</p>
          {space.stories.map((story) => {
            return (
              <Space
                key={story.id}
                id={story.id}
                name={story.name}
                content={story.content}
                imageUrl={story.imageUrl}
              />
            );
          })}
        </Container>
      )}
    </div>
  );
}
