import React from "react";
import { useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Spacecard from "../../components/Spacecard";
import { fetchSpaces } from "../../store/space/actions";
import { selectSpaces } from "../../store/space/selectors";

export default function Home() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpaces);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, []);

  return (
    <div>
      {" "}
      <Jumbotron>
        <h1>Spaces</h1>
      </Jumbotron>
      <Container>
        {spaces.map((space) => {
          return (
            <Spacecard
              key={space.id}
              id={space.id}
              title={space.title}
              description={space.description}
              backgroundColor={space.backgroundColor}
              color={space.color}
            />
          );
        })}
      </Container>
    </div>
  );
}
