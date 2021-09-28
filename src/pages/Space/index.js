import React from "react";
import { useEffect } from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Storycard from "../../components/Storycard";
import { fetchStories, spacesFetched } from "../../store/space/actions";
import { selectStories } from "../../store/space/selectors";

export default function Space() {
  const dispatch = useDispatch();
  const stories = useSelector(selectStories);
  const id = useParams();

  console.log("these are the stories", stories);

  useEffect(() => {
    dispatch(fetchStories(id));
  }, []);

  return (
    <div>
      <Container>
        {!stories ? (
          "...Loading"
        ) : (
          <Jumbotron
            style={{
              backgroundColor: stories.backgroundColor,
              color: stories.color,
            }}
          >
            <div>
              <h2>{stories.title}</h2>
              <p>{stories.description}</p>
            </div>
          </Jumbotron>
        )}
        {!stories ? (
          "...Loading"
        ) : (
          <Jumbotron
            style={{
              backgroundColor: stories.backgroundColor,
              color: stories.color,
            }}
          >
            {stories.stories
              .sort((a, b) => {
                return b.createdAt.localeCompare(a.createdAt);
              })
              .map((story) => {
                return (
                  <Storycard
                    key={story.id}
                    id={story.id}
                    name={story.name}
                    content={story.content}
                    imageUrl={story.imageUrl}
                  />
                );
              })}
          </Jumbotron>
        )}
      </Container>
    </div>
  );
}
