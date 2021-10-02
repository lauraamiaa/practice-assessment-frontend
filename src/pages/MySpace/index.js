import React from "react";
import Space from "../../components/Space";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { selectUser } from "../../store/user/selectors";
import { createStory, updateSpace } from "../../store/user/actions";

export default function MySpace() {
  const { space } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [showPostForm, setShowPostForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // edit form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (space) {
      setTitle(space.title);
      setDescription(space.description);
      setBackgroundColor(space.backgroundColor);
      setColor(space.color);
    }
  }, [space]);

  // post form state
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createStory({ name, content, imageUrl, spaceId: space.id }));
  }

  function handleEdit(e) {
    e.preventDefault();
    dispatch(updateSpace({ title, description, backgroundColor, color }));
  }

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
          <Button
            onClick={() =>
              showEditForm ? setShowEditForm(false) : setShowEditForm(true)
            }
          >
            Edit my space
          </Button>
          {showEditForm ? (
            <form>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                Background Color:
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
              <label>
                Font Color:
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>
              <Button type="submit" onClick={handleEdit}>
                Edit Space
              </Button>
            </form>
          ) : null}
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
            onClick={() =>
              showPostForm ? setShowPostForm(false) : setShowPostForm(true)
            }
          >
            Post a cool story bro!
          </Button>
          {showPostForm ? (
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
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>
              <Button type="submit" onClick={handleSubmit}>
                Submit Story
              </Button>
              <img src={imageUrl} alt={imageUrl}></img>
            </form>
          ) : null}
        </Container>
      )}
    </div>
  );
}
