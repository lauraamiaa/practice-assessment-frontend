import React from "react";
import Space from "../../components/Space";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { selectUser } from "../../store/user/selectors";
import { createStory } from "../../store/user/actions";

export default function MySpace() {
  const { space } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [image, setImgage] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  console.log("this is the space", space);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createStory({ name, content, imageUrl, spaceId: space.id }));
  }

  const previewImg = (e) => {
    e.preventDefault();
    setImgage(e.target.value);
    setImageUrl(e.target.value);
  };

  //   console.log(name, content, imageUrl);

  return (
    <div>
      {!space ? (
        <h1>You have no own space yet</h1>
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
          <Button
            onClick={() => (showForm ? setShowForm(false) : setShowForm(true))}
          >
            Post a cool story bro!
          </Button>
          {showForm ? (
            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Content:
                <input
                  type="text"
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>
              <label>
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={previewImg}
                />
              </label>
              <Button type="submit" onClick={handleSubmit}>
                Submit Story
              </Button>
              <img
                src={image ? image : null}
                alt={image ? image.name : null}
              ></img>
            </form>
          ) : null}
        </Container>
      )}
    </div>
  );
}
